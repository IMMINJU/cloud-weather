import type { Incident, StatuspageIncident } from './types';
import Parser from 'rss-parser';
import { parseISO, subDays, isAfter } from 'date-fns';
import { fetchWithTimeout } from './fetch-helper';

// Statuspage incidents 가져오기 (Cloudflare, GitHub, Vercel)
async function getStatuspageIncidents(url: string, serviceName: string, limit = 5): Promise<Incident[]> {
  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const incidents: StatuspageIncident[] = data.incidents || [];

    return incidents.slice(0, limit).map((incident) => ({
      id: incident.id,
      name: `[${serviceName}] ${incident.name}`,
      status: incident.status as Incident['status'],
      impact: incident.impact as Incident['impact'],
      createdAt: parseISO(incident.created_at),
      updatedAt: parseISO(incident.updated_at),
      shortlink: incident.shortlink,
      updates: incident.incident_updates.map((update) => ({
        id: update.id,
        status: update.status,
        body: update.body,
        createdAt: parseISO(update.created_at),
      })),
    }));
  } catch (error) {
    console.error(`Failed to fetch ${serviceName} incidents:`, error);
    return [];
  }
}

// AWS RSS에서 incidents 가져오기
async function getAWSIncidents(limit = 5): Promise<Incident[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://status.aws.amazon.com/rss/all.rss');
    const items = feed.items?.slice(0, limit * 2) || [];

    // 최근 7일 이내의 아이템만
    const sevenDaysAgo = subDays(new Date(), 7);
    const recentItems = items.filter((item) => {
      if (!item.pubDate) return false;
      const itemDate = new Date(item.pubDate);
      return isAfter(itemDate, sevenDaysAgo);
    });

    return recentItems.map((item, index) => {
      const title = item.title || 'AWS Update';
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

      // 제목에서 impact 판단
      let impact: Incident['impact'] = 'minor';
      if (title.includes('Service is operating normally')) {
        impact = 'none';
      } else if (title.includes('Increased') || title.includes('High')) {
        impact = 'major';
      }

      return {
        id: `aws-${index}-${pubDate.getTime()}`,
        name: `[AWS] ${title}`,
        status: title.includes('operating normally') ? 'resolved' : 'monitoring',
        impact,
        createdAt: pubDate,
        updatedAt: pubDate,
        shortlink: item.link,
        updates: [
          {
            id: `update-${index}`,
            status: 'update',
            body: item.contentSnippet || item.content || title,
            createdAt: pubDate,
          },
        ],
      };
    });
  } catch (error) {
    console.error('Failed to fetch AWS incidents:', error);
    return [];
  }
}

// 모든 서비스의 incidents를 통합하여 가져오기
export async function getAllIncidents(limit = 10): Promise<Incident[]> {
  const perServiceLimit = Math.ceil(limit / 4);

  const [cloudflare, github, vercel, aws] = await Promise.all([
    getStatuspageIncidents(
      'https://www.cloudflarestatus.com/api/v2/incidents.json',
      'Cloudflare',
      perServiceLimit
    ),
    getStatuspageIncidents(
      'https://www.githubstatus.com/api/v2/incidents.json',
      'GitHub',
      perServiceLimit
    ),
    getStatuspageIncidents(
      'https://www.vercel-status.com/api/v2/incidents.json',
      'Vercel',
      perServiceLimit
    ),
    getAWSIncidents(perServiceLimit),
  ]);

  // 모든 incidents를 합치고 시간순으로 정렬 (최신순)
  const allIncidents = [...cloudflare, ...github, ...vercel, ...aws];
  allIncidents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return allIncidents.slice(0, limit); // 요청된 개수만 반환
}
