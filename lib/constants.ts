import { FaAws, FaGithub } from 'react-icons/fa';
import { SiCloudflare, SiVercel } from 'react-icons/si';
import type { WeatherType } from './api/types';

// Service icons mapping
export const SERVICE_ICONS = {
  'AWS': FaAws,
  'Cloudflare': SiCloudflare,
  'GitHub': FaGithub,
  'Vercel': SiVercel,
} as const;

// Weather severity levels (higher = more severe)
export const WEATHER_SEVERITY: Record<WeatherType, number> = {
  stormy: 5,
  rainy: 4,
  overcast: 3,
  cloudy: 2,
  sunny: 1,
} as const;

// Weather-based style configurations
export const WEATHER_STYLES = {
  sunny: {
    bg: 'bg-gradient-to-br from-yellow-400/90 via-orange-400/90 to-orange-500/90',
    border: 'border-yellow-300/80',
    text: 'text-yellow-900',
    badge: 'bg-yellow-200/90 text-yellow-900',
    shadow: 'shadow-yellow-500/50',
  },
  cloudy: {
    bg: 'bg-gradient-to-br from-slate-300/90 via-gray-400/90 to-slate-400/90',
    border: 'border-slate-300/80',
    text: 'text-slate-900',
    badge: 'bg-slate-200/90 text-slate-900',
    shadow: 'shadow-slate-400/50',
  },
  overcast: {
    bg: 'bg-gradient-to-br from-gray-500/90 via-slate-600/90 to-gray-600/90',
    border: 'border-gray-400/80',
    text: 'text-white',
    badge: 'bg-gray-300/90 text-gray-900',
    shadow: 'shadow-gray-600/50',
  },
  rainy: {
    bg: 'bg-gradient-to-br from-blue-600/90 via-indigo-700/90 to-blue-700/90',
    border: 'border-blue-500/80',
    text: 'text-white',
    badge: 'bg-blue-200/90 text-blue-900',
    shadow: 'shadow-blue-700/50',
  },
  stormy: {
    bg: 'bg-gradient-to-br from-purple-800/90 via-indigo-900/90 to-slate-900/90',
    border: 'border-purple-700/80',
    text: 'text-white',
    badge: 'bg-purple-200/90 text-purple-900',
    shadow: 'shadow-purple-900/50',
  },
} as const;
