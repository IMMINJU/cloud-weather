// 서비스 상태 타입
export type ServiceStatus =
  | 'operational'      // 정상
  | 'degraded'         // 성능 저하
  | 'partial_outage'   // 일부 장애
  | 'major_outage'     // 주요 장애
  | 'under_maintenance' // 유지보수
  | 'unknown';         // 알 수 없음

// 날씨 타입 (UI 표시용)
export type WeatherType =
  | 'sunny'    // ☀️ 맑음
  | 'cloudy'   // ⛅ 구름 조금
  | 'overcast' // ☁️ 흐림
  | 'rainy'    // 🌧️ 비
  | 'stormy';  // ⛈️ 폭풍

// 서비스 정보
export interface ServiceInfo {
  id: string;
  name: string;
  status: ServiceStatus;
  weather: WeatherType;
  description: string;
  lastUpdated: Date;
  url: string;
}

// 인시던트 정보
export interface Incident {
  id: string;
  name: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'postmortem';
  impact: 'none' | 'minor' | 'major' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  shortlink?: string;
  updates: IncidentUpdate[];
}

// 인시던트 업데이트
export interface IncidentUpdate {
  id: string;
  status: string;
  body: string;
  createdAt: Date;
}

// Statuspage API 응답 타입 (표준)
export interface StatuspageStatus {
  page: {
    id: string;
    name: string;
    url: string;
    updated_at: string;
  };
  status: {
    indicator: 'none' | 'minor' | 'major' | 'critical';
    description: string;
  };
}

export interface StatuspageIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  shortlink: string;
  incident_updates: Array<{
    id: string;
    status: string;
    body: string;
    created_at: string;
  }>;
}

export interface StatuspageResponse {
  page?: {
    id: string;
    name: string;
    url: string;
    updated_at: string;
  };
  status?: {
    indicator: string;
    description: string;
  };
  incidents?: StatuspageIncident[];
}
