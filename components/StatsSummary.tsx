'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { Incident, ServiceInfo } from '@/lib/api/types';

interface StatsSummaryProps {
  incidents: Incident[];
  services: ServiceInfo[];
  onFilterClick?: (filter: { type: 'impact' | 'status' | 'all', value: string }) => void;
}

export function StatsSummary({ incidents, services: _services, onFilterClick }: StatsSummaryProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (cardType: string, filter?: { type: 'impact' | 'status' | 'all', value: string }) => {
    // 같은 카드를 다시 클릭하면 토글 (필터 해제)
    const isDeactivating = activeCard === cardType;
    setActiveCard(isDeactivating ? null : cardType);

    // 타임라인으로 스크롤
    const timeline = document.getElementById('timeline-section');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 필터 적용 또는 해제
    if (onFilterClick) {
      setTimeout(() => {
        if (isDeactivating) {
          // 필터 해제
          onFilterClick({ type: 'all', value: 'all' });
        } else if (filter) {
          // 필터 적용
          onFilterClick(filter);
        }
      }, 300); // 스크롤 후 필터 적용 (타이밍 단축)
    }
  };
  // 최근 7일간 incidents 카운트
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentIncidents = incidents.filter(
    (i) => i.createdAt.getTime() > sevenDaysAgo
  );

  // impact별 카운트
  const criticalCount = recentIncidents.filter((i) => i.impact === 'critical').length;
  const majorCount = recentIncidents.filter((i) => i.impact === 'major').length;

  // 활성 incidents (resolved가 아닌 것들)
  const activeIncidents = recentIncidents.filter((i) => i.status !== 'resolved');

  // 3개 카드를 표시
  const cards = [
    {
      id: 'total',
      value: recentIncidents.length,
      label: 'Total Issues',
      gradient: 'from-blue-400 to-blue-700',
      ringColor: 'ring-blue-300',
      textColor: 'text-blue-100',
      filter: { type: 'all' as const, value: 'all' },
    },
    {
      id: 'critical',
      value: majorCount + criticalCount,
      label: 'Critical Issues',
      gradient: 'from-red-400 to-red-700',
      ringColor: 'ring-red-300',
      textColor: 'text-red-100',
      filter: { type: 'impact' as const, value: 'major' },
    },
    {
      id: 'active',
      value: activeIncidents.length,
      label: 'Active Issues',
      gradient: 'from-purple-400 to-indigo-700',
      ringColor: 'ring-purple-300',
      textColor: 'text-purple-100',
      filter: { type: 'status' as const, value: 'active' },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {cards.map((card, index) => {
          const isClickable = typeof card.value === 'number' ? card.value > 0 : true;

          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={isClickable ? () => handleCardClick(card.id, card.filter) : undefined}
              disabled={!isClickable}
              aria-label={`${card.label}: ${card.value}`}
              aria-pressed={activeCard === card.id}
              className={clsx(
                'bg-gradient-to-br p-6 md:p-8',
                'group relative overflow-hidden transition-shadow',
                'outline-none focus:outline-none border-0',
                card.gradient,
                isClickable ? 'cursor-pointer' : 'cursor-default opacity-60',
                activeCard === card.id && `shadow-2xl ring-4 ${card.ringColor}`
              )}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-display font-black text-white mb-2">
                  {card.value}
                </div>
                <div className={clsx('text-base md:text-lg font-semibold', card.textColor)}>
                  {card.label}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
