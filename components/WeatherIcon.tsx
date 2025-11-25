import clsx from 'clsx';
import { getWeatherEmoji } from '@/lib/utils';
import type { WeatherType } from '@/lib/api/types';

interface WeatherIconProps {
  weather: WeatherType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function WeatherIcon({ weather, size = 'md' }: WeatherIconProps) {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl md:text-9xl',
    xl: 'text-[10rem] md:text-[12rem]',
  };

  const animationClasses = {
    sunny: 'animate-spin-slow',
    cloudy: 'animate-float',
    overcast: 'animate-float-slow',
    rainy: 'animate-bounce-slow',
    stormy: 'animate-shake',
  };

  return (
    <span
      className={clsx(
        'inline-block transition-transform hover:scale-110',
        sizeClasses[size],
        animationClasses[weather]
      )}
      role="img"
      aria-label={weather}
    >
      {getWeatherEmoji(weather)}
    </span>
  );
}
