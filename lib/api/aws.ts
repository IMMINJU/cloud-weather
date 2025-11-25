import Parser from 'rss-parser';
import type { ServiceInfo } from './types';

const AWS_RSS_URL = 'https://status.aws.amazon.com/rss/all.rss';

export async function getAWSStatus(): Promise<ServiceInfo> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(AWS_RSS_URL);

    // RSS 피드에서 최근 아이템 확인
    const recentItems = feed.items?.slice(0, 5) || [];

    // 최근 24시간 이내의 이슈만 확인
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentIssues = recentItems.filter((item) => {
      const itemDate = item.pubDate ? new Date(item.pubDate).getTime() : 0;
      return itemDate > oneDayAgo;
    });

    let status: ServiceInfo['status'] = 'operational';
    let weather: ServiceInfo['weather'] = 'sunny';
    let description = 'All systems operational';

    if (recentIssues.length > 0) {
      const latestIssue = recentIssues[0];
      const title = latestIssue.title || '';

      // 제목에서 심각도 판단
      if (title.includes('Service is operating normally')) {
        status = 'operational';
        weather = 'sunny';
        description = 'Service restored to normal';
      } else if (title.includes('Degraded') || title.includes('Performance')) {
        status = 'degraded';
        weather = 'cloudy';
        description = title;
      } else if (title.includes('Informational')) {
        status = 'degraded';
        weather = 'cloudy';
        description = title;
      } else {
        // 기타 이슈
        status = 'partial_outage';
        weather = 'overcast';
        description = title;
      }
    }

    return {
      id: 'aws',
      name: 'AWS',
      status,
      weather,
      description,
      lastUpdated: recentIssues[0]?.pubDate
        ? new Date(recentIssues[0].pubDate)
        : new Date(),
      url: 'https://health.aws.amazon.com/health/status',
    };
  } catch (error) {
    console.error('Failed to fetch AWS status:', error);
    return {
      id: 'aws',
      name: 'AWS',
      status: 'unknown',
      weather: 'cloudy',
      description: 'Status unavailable',
      lastUpdated: new Date(),
      url: 'https://health.aws.amazon.com/health/status',
    };
  }
}
