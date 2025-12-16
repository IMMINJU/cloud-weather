import type { ServiceInfoWithMeta, ApiResponseMetadata, StatuspageResponse } from './types';
import { indicatorToStatus, statusToWeather } from '../utils';
import { fetchWithTimeout } from './fetch-helper';

const VERCEL_STATUS_URL = 'https://www.vercel-status.com/api/v2/status.json';

export async function getVercelStatus(): Promise<ServiceInfoWithMeta> {
  const fetchedAt = new Date();
  let metadata: ApiResponseMetadata = {
    fetchedAt,
    status: 'success',
    service: 'Vercel',
  };

  try {
    const response = await fetchWithTimeout(VERCEL_STATUS_URL, {
      cache: 'no-store',
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
      metadata,
    };
  } catch (error) {
    console.error('Failed to fetch Vercel status:', error);

    metadata.status = 'error';
    metadata.errorMessage = error instanceof Error ? error.message : 'Failed to fetch Vercel status';

    return {
      id: 'vercel',
      name: 'Vercel',
      status: 'unknown',
      weather: 'cloudy',
      description: 'Status unavailable',
      lastUpdated: new Date(),
      url: 'https://www.vercel-status.com/',
      metadata,
    };
  }
}
