'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherDescription, formatRelativeTime } from '@/lib/utils';
import { SERVICE_ICONS, WEATHER_STYLES } from '@/lib/constants';
import type { ServiceInfo } from '@/lib/api/types';

interface ServiceCardProps {
  service: ServiceInfo;
  index?: number;
  isHero?: boolean;
}

export function ServiceCard({ service, index = 0, isHero = false }: ServiceCardProps) {
  const IconComponent = SERVICE_ICONS[service.name as keyof typeof SERVICE_ICONS];
  const iconSize = isHero ? 'w-20 h-20 md:w-24 md:h-24' : 'w-8 h-8 md:w-10 md:h-10';
  const weatherIconSize = isHero ? 'w-32 h-32 md:w-40 md:h-40' : 'w-12 h-12 md:w-16 md:h-16';
  const weatherStyles = WEATHER_STYLES[service.weather as keyof typeof WEATHER_STYLES];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'block rounded-2xl backdrop-blur-md group',
          'transition-all duration-300 ease-out',
          'border-2',
          'relative overflow-hidden',
          isHero ? 'p-10 md:p-12' : 'p-6 md:p-8',
          weatherStyles.bg,
          weatherStyles.border,
          weatherStyles.shadow
        )}
      >
      {/* Weather overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

      {/* 외부 링크 아이콘 */}
      <div className={clsx(
        'absolute top-4 right-4 pointer-events-none',
        'opacity-40 group-hover:opacity-100 transition-opacity duration-300',
        weatherStyles.text
      )}>
        <svg
          className={isHero ? 'w-6 h-6 md:w-7 md:h-7' : 'w-5 h-5 md:w-6 md:h-6'}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* 백그라운드 서비스 아이콘 (워터마크) */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden">
        <div className={clsx(
          'opacity-[0.08]',
          weatherStyles.text,
          isHero ? 'scale-[8] md:scale-[10]' : 'scale-[5] md:scale-[6]',
          isHero ? '-translate-x-24 -translate-y-24' : '-translate-x-16 -translate-y-16'
        )}>
          <IconComponent className={iconSize} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            {/* 날씨 아이콘 (왼쪽) */}
            <div className={clsx('pointer-events-none flex items-center justify-center', weatherIconSize)}>
              <WeatherIcon weather={service.weather} size={isHero ? 'lg' : 'md'} />
            </div>
            <div className="flex-1">
              <h3 className={clsx(
                'font-display font-bold mb-2',
                isHero ? 'text-4xl md:text-5xl' : 'text-xl md:text-2xl',
                weatherStyles.text
              )}>
                {service.name}
              </h3>
              <span className={clsx(
                'inline-block font-semibold rounded-full shadow-sm',
                isHero ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1.5',
                weatherStyles.badge
              )}>
                {getWeatherDescription(service.weather)}
              </span>
            </div>
          </div>
        </div>

        <div className={clsx('space-y-2', weatherStyles.text)}>
          <p className={clsx(
            'font-medium opacity-90',
            isHero ? 'text-xl md:text-2xl' : 'text-sm md:text-base'
          )}>
            {service.description}
          </p>
          <p className={clsx(
            'opacity-70',
            isHero ? 'text-base' : 'text-xs md:text-sm'
          )}>
            🕐 {formatRelativeTime(service.lastUpdated)}
          </p>
        </div>

      </div>

      </Link>
    </motion.div>
  );
}
