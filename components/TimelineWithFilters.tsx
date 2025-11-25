'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '@/lib/utils';
import { groupIncidentsByDate } from '@/lib/date-utils';
import { highlightText } from '@/lib/text-utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useIncidentFilters } from '@/hooks/useIncidentFilters';
import type { Incident } from '@/lib/api/types';

interface TimelineWithFiltersProps {
  incidents: Incident[];
  externalFilter?: { type: 'impact' | 'status' | 'all', value: string } | null;
}

export function TimelineWithFilters({ incidents, externalFilter }: TimelineWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    filteredIncidents,
    serviceFilter,
    setServiceFilter,
    impactFilter,
    setImpactFilter,
    statusFilter,
    setStatusFilter,
  } = useIncidentFilters(incidents, externalFilter, debouncedSearchQuery);

  if (incidents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-white/50"
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-800">Timeline</h2>
        <p className="text-gray-600 text-center py-8">
          No recent issues. All services are operational! 🎉
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="timeline-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/50"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-gray-800">Timeline</h2>

      {/* 검색 UI */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pr-12 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white focus:shadow-md transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          {searchQuery !== debouncedSearchQuery && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* 필터 UI */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* 서비스 필터 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setServiceFilter('all')}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                  serviceFilter === 'all'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                All
              </button>
              {[
                { name: 'AWS', gradient: 'from-[#FF9900] to-amber-600' },
                { name: 'Cloudflare', gradient: 'from-orange-500 to-orange-600' },
                { name: 'GitHub', gradient: 'from-gray-700 to-gray-800' },
                { name: 'Vercel', gradient: 'from-black to-zinc-900' },
              ].map(({ name, gradient }) => (
                <button
                  key={name}
                  onClick={() => setServiceFilter(name)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                    serviceFilter === name
                      ? `bg-gradient-to-r ${gradient} text-white scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Impact 필터 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Impact
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setImpactFilter('all')}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                  impactFilter === 'all'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                All
              </button>
              {[
                { value: 'critical', label: 'Critical', gradient: 'from-red-500 to-rose-600' },
                { value: 'major', label: 'Major', gradient: 'from-orange-500 to-orange-600' },
                { value: 'minor', label: 'Minor', gradient: 'from-yellow-400 to-yellow-500' },
              ].map(({ value, label, gradient }) => (
                <button
                  key={value}
                  onClick={() => setImpactFilter(value)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                    impactFilter === value
                      ? `bg-gradient-to-r ${gradient} text-white scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 상태 필터 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                  statusFilter === 'all'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                  statusFilter === 'active'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm',
                  statusFilter === 'resolved'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        {/* 필터링 결과 표시 */}
        <div className="text-sm font-medium text-gray-600 bg-gray-50 rounded-xl px-4 py-2 inline-block">
          Showing {filteredIncidents.length} of {incidents.length} issues
        </div>
      </div>

      {/* 타임라인 아이템들 */}
      {filteredIncidents.length === 0 ? (
        <p className="text-gray-600 text-center py-12 bg-gray-50 rounded-2xl">
          No issues match the filter criteria.
        </p>
      ) : (
        <div className="space-y-8">
          {Array.from(groupIncidentsByDate(filteredIncidents)).map(([dateGroup, groupIncidents], groupIndex) => (
            <motion.div
              key={dateGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="relative"
            >
              {/* 날짜 그룹 헤더 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                  {dateGroup}
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>

              {/* 타임라인 아이템들 */}
              <div className="relative pl-8 md:pl-10 space-y-6">
                {/* 세로 타임라인 - 모바일에서 더 두껍게 */}
                <div className="absolute left-3 md:left-4 top-0 bottom-0 w-1 md:w-0.5 bg-gradient-to-b from-blue-300 via-blue-200 to-transparent"></div>

                {groupIncidents.map((incident, index) => {
            const serviceName = incident.name.match(/\[(.*?)\]/)?.[1] || 'Unknown';

            const serviceColors: Record<string, string> = {
              AWS: 'bg-gradient-to-r from-[#FF9900] to-amber-600 text-white',
              Cloudflare: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
              GitHub: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white',
              Vercel: 'bg-gradient-to-r from-black to-zinc-900 text-white',
            };

            const serviceDotColors: Record<string, string> = {
              AWS: 'bg-[#FF9900] ring-orange-200',
              Cloudflare: 'bg-orange-500 ring-orange-200',
              GitHub: 'bg-gray-700 ring-gray-300',
              Vercel: 'bg-black ring-gray-300',
            };

            const colorClass = serviceColors[serviceName] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
            const dotColorClass = serviceDotColors[serviceName] || 'bg-gray-500 ring-gray-200';

            const statusIcons: Record<string, string> = {
              investigating: '🔍',
              identified: '⚠️',
              monitoring: '👀',
              resolved: '✅',
              postmortem: '📝',
            };

            const statusIcon = statusIcons[incident.status] || '📌';

            const impactColors: Record<string, string> = {
              none: 'text-green-700 font-semibold',
              minor: 'text-yellow-700 font-semibold',
              major: 'text-orange-700 font-semibold',
              critical: 'text-red-700 font-semibold',
            };

            const impactClass = impactColors[incident.impact] || 'text-gray-700';

            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: groupIndex * 0.1 + index * 0.05,
                  ease: "easeOut"
                }}
                className="relative"
              >
                {/* 타임라인 점 - 모바일에서 더 크게 */}
                <div className={clsx(
                  'absolute left-[-26px] md:left-[-28px] top-6 w-4 h-4 md:w-3 md:h-3 rounded-full ring-4',
                  dotColorClass,
                  'shadow-lg z-10'
                )}></div>

                {/* 아이템 카드 */}
                <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl" role="img" aria-label={incident.status}>
                      {statusIcon}
                    </span>
                    <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={clsx('text-xs px-3 py-1.5 rounded-full font-bold shadow-sm', colorClass)}>
                        {serviceName}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatRelativeTime(incident.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {highlightText(incident.name.replace(/\[.*?\]\s*/, ''), debouncedSearchQuery)}
                    </h3>
                    <p className={clsx('text-sm capitalize mb-2', impactClass)}>
                      {incident.impact} · {incident.status.replace('_', ' ')}
                    </p>
                    {incident.updates && incident.updates.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {highlightText(incident.updates[0].body, debouncedSearchQuery)}
                      </p>
                    )}
                    {incident.shortlink && (
                      <a
                        href={incident.shortlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-block hover:underline"
                      >
                        View Details →
                      </a>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
