import type { ServiceInfo, StatuspageResponse } from './types';
import { indicatorToStatus, statusToWeather } from '../utils';
import { fetchWithTimeout } from './fetch-helper';

const GITHUB_STATUS_URL = 'https://www.githubstatus.com/api/v2/status.json';

export async function getGitHubStatus(): Promise<ServiceInfo> {
  try {
    const response = await fetchWithTimeout(GITHUB_STATUS_URL, {
      next: { revalidate: 60 }, // 1분마다 재검증
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: StatuspageResponse = await response.json();

    const indicator = data.status?.indicator || 'none';
    const status = indicatorToStatus(indicator);
    const weather = statusToWeather(status);

    return {
      id: 'github',
      name: 'GitHub',
      status,
      weather,
      description: data.status?.description || 'All Systems Operational',
      lastUpdated: new Date(data.page?.updated_at || new Date()),
      url: 'https://www.githubstatus.com/',
    };
  } catch (error) {
    console.error('Failed to fetch GitHub status:', error);
    return {
      id: 'github',
      name: 'GitHub',
      status: 'unknown',
      weather: 'cloudy',
      description: 'Status unavailable',
      lastUpdated: new Date(),
      url: 'https://www.githubstatus.com/',
    };
  }
}
