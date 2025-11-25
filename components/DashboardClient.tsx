'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { TimelineWithFilters } from './TimelineWithFilters';
import { StatsSummary } from './StatsSummary';
import { WEATHER_SEVERITY } from '@/lib/constants';
import type { Incident, ServiceInfo } from '@/lib/api/types';

interface DashboardClientProps {
  services: ServiceInfo[];
  incidents: Incident[];
}

export function DashboardClient({ services, incidents }: DashboardClientProps) {
  const [timelineFilter, setTimelineFilter] = useState<{ type: 'impact' | 'status' | 'all', value: string } | null>(null);

  // Sort services by weather severity (most severe first)
  const sortedServices = [...services].sort((a, b) => {
    return (WEATHER_SEVERITY[b.weather] || 0) - (WEATHER_SEVERITY[a.weather] || 0);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 히어로 카드 - 가장 심각한 상태의 서비스 */}
      {sortedServices[0] && (
        <div className="mb-6">
          <ServiceCard key={sortedServices[0].id} service={sortedServices[0]} index={0} isHero={true} />
        </div>
      )}

      {/* 작은 카드들 - 나머지 서비스 */}
      {sortedServices.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {sortedServices.slice(1).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index + 1} isHero={false} />
          ))}
        </div>
      )}

      <div className="mb-8">
        <StatsSummary incidents={incidents} services={services} onFilterClick={setTimelineFilter} />
      </div>

      <div className="mb-8">
        <TimelineWithFilters incidents={incidents} externalFilter={timelineFilter} />
      </div>
    </motion.div>
  );
}
