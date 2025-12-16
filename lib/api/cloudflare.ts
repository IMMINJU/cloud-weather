import type { ServiceInfoWithMeta, ApiResponseMetadata, StatuspageResponse } from './types';
import { indicatorToStatus, statusToWeather } from '../utils';
import { fetchWithTimeout } from './fetch-helper';

const CLOUDFLARE_STATUS_URL = 'https://www.cloudflarestatus.com/api/v2/status.json';

export async function getCloudflareStatus(): Promise<ServiceInfoWithMeta> {
  const fetchedAt = new Date();
  let metadata: ApiResponseMetadata = {
    fetchedAt,
    status: 'success',
    service: 'Cloudflare',
  };

  try {
    const response = await fetchWithTimeout(CLOUDFLARE_STATUS_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.status}`);
    }

    const data: StatuspageResponse = await response.json();

    const indicator = data.status?.indicator || 'none';
    const status = indicatorToStatus(indicator);
    const weather = statusToWeather(status);

    return {
      id: 'cloudflare',
      name: 'Cloudflare',
      status,
      weather,
      description: data.status?.description || 'All systems operational',
      lastUpdated: new Date(data.page?.updated_at || new Date()),
      url: 'https://www.cloudflarestatus.com/',
      metadata,
    };
  } catch (error) {
    console.error('Failed to fetch Cloudflare status:', error);

    metadata.status = 'error';
    metadata.errorMessage = error instanceof Error ? error.message : 'Failed to fetch Cloudflare status';

    return {
      id: 'cloudflare',
      name: 'Cloudflare',
      status: 'unknown',
      weather: 'cloudy',
      description: 'Status unavailable',
      lastUpdated: new Date(),
      url: 'https://www.cloudflarestatus.com/',
      metadata,
    };
  }
}
