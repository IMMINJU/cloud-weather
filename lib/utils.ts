import type { ServiceStatus, WeatherType } from './api/types';
import { formatDistanceToNow } from 'date-fns';

// 서비스 상태를 날씨로 변환
export function statusToWeather(status: ServiceStatus): WeatherType {
  switch (status) {
    case 'operational':
      return 'sunny';
    case 'degraded':
      return 'cloudy';
    case 'partial_outage':
      return 'overcast';
    case 'major_outage':
      return 'rainy';
    case 'under_maintenance':
      return 'overcast';
    case 'unknown':
    default:
      return 'cloudy';
  }
}

// 날씨 이모지 가져오기
export function getWeatherEmoji(weather: WeatherType): string {
  switch (weather) {
    case 'sunny':
      return '☀️';
    case 'cloudy':
      return '⛅';
    case 'overcast':
      return '☁️';
    case 'rainy':
      return '🌧️';
    case 'stormy':
      return '⛈️';
    default:
      return '☁️';
  }
}

// 날씨 설명 가져오기
export function getWeatherDescription(weather: WeatherType): string {
  switch (weather) {
    case 'sunny':
      return 'Clear';
    case 'cloudy':
      return 'Partly Cloudy';
    case 'overcast':
      return 'Cloudy';
    case 'rainy':
      return 'Rain';
    case 'stormy':
      return 'Storm';
    default:
      return 'Unknown';
  }
}


// 시간 포맷팅 (상대 시간)
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

// Statuspage indicator를 ServiceStatus로 변환
export function indicatorToStatus(indicator: string): ServiceStatus {
  switch (indicator) {
    case 'none':
      return 'operational';
    case 'minor':
      return 'degraded';
    case 'major':
      return 'partial_outage';
    case 'critical':
      return 'major_outage';
    default:
      return 'unknown';
  }
}
