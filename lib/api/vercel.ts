import type { ServiceInfo, StatuspageResponse } from './types';
import { indicatorToStatus, statusToWeather } from '../utils';
import { fetchWithTimeout } from './fetch-helper';

const VERCEL_STATUS_URL = 'https://www.vercel-status.com/api/v2/status.json';

export async function getVercelStatus(): Promise<ServiceInfo> {
  try {
    const response = await fetchWithTimeout(VERCEL_STATUS_URL, {
      next: { revalidate: 60 }, // 1분마다 재검증
    });

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const data: StatuspageResponse = await response.json();

    const indicator = data.status?.indicator || 'none';
    const status = indicatorToStatus(indicator);
    const weather = statusToWeather(status);

    return {
      id: 'vercel',
      name: 'Vercel',
      status,
      weather,
      description: data.status?.description || 'All Systems Operational',
      lastUpdated: new Date(data.page?.updated_at || new Date()),
      url: 'https://www.vercel-status.com/',
    };
  } catch (error) {
    console.error('Failed to fetch Vercel status:', error);
    return {
      id: 'vercel',
      name: 'Vercel',
      status: 'unknown',
      weather: 'cloudy',
      description: 'Status unavailable',
      lastUpdated: new Date(),
      url: 'https://www.vercel-status.com/',
    };
  }
}
