'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { differenceInSeconds, differenceInMinutes } from 'date-fns';

interface AutoRefreshProps {
  intervalMs?: number; // 기본값: 60초
}

export function AutoRefresh({ intervalMs = 60000 }: AutoRefreshProps) {
  const router = useRouter();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState('Just now');

  useEffect(() => {
    // 자동 새로고침
    const refreshInterval = setInterval(() => {
      router.refresh();
      setLastUpdate(new Date());
    }, intervalMs);

    // 시간 표시 업데이트 (1초마다)
    const timeInterval = setInterval(() => {
      const now = new Date();
      const diffSeconds = differenceInSeconds(now, lastUpdate);

      if (diffSeconds < 10) {
        setTimeAgo('Just now');
      } else if (diffSeconds < 60) {
        setTimeAgo(`${diffSeconds}s ago`);
      } else {
        const diffMinutes = differenceInMinutes(now, lastUpdate);
        setTimeAgo(`${diffMinutes}m ago`);
      }
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(timeInterval);
    };
  }, [router, intervalMs, lastUpdate]);

  return (
    <div className="fixed top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl border-2 border-white/50 flex items-center gap-3 animate-fade-in z-50">
      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
      <span className="text-sm font-semibold text-gray-700">
        🔄 Updated {timeAgo}
      </span>
    </div>
  );
}
