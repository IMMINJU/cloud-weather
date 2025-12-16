'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import type { ServiceInfoWithMeta } from '@/lib/api/types';
import { FiAlertCircle, FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';

interface DataFreshnessIndicatorProps {
  services: ServiceInfoWithMeta[];
}

export function DataFreshnessIndicator({ services }: DataFreshnessIndicatorProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    // Wait a bit for the refresh to complete
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  const now = new Date();
  const errorServices = services.filter(s => s.metadata.status === 'error');
  const oldestFetch = services.reduce((oldest, service) => {
    return service.metadata.fetchedAt < oldest ? service.metadata.fetchedAt : oldest;
  }, now);

  const dataAge = now.getTime() - oldestFetch.getTime();
  const isStale = dataAge > 5 * 60 * 1000; // 5 minutes
  const hasErrors = errorServices.length > 0;

  if (!hasErrors && !isStale) {
    return (
      <div className="flex items-center justify-between gap-4 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4" />
          <span>
            Data updated {formatDistanceToNow(oldestFetch, { addSuffix: true })}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/30 rounded transition-colors disabled:opacity-50"
          aria-label="Refresh data"
        >
          <FiRefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    );
  }

  if (hasErrors) {
    return (
      <div className="flex flex-col gap-2 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <FiAlertCircle className="w-4 h-4" />
            <span className="font-medium">
              Unable to fetch status for {errorServices.length} service{errorServices.length > 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30 rounded transition-colors disabled:opacity-50"
            aria-label="Retry fetching data"
          >
            <FiRefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            Retry
          </button>
        </div>
        <ul className="ml-6 space-y-1 text-red-600 dark:text-red-400">
          {errorServices.map(service => (
            <li key={service.id} className="text-xs">
              {service.name}: {service.metadata.errorMessage || 'Unknown error'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isStale) {
    return (
      <div className="flex items-center justify-between gap-4 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2">
          <FiClock className="w-4 h-4" />
          <span>
            Data may be stale (last updated {formatDistanceToNow(oldestFetch, { addSuffix: true })})
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/30 rounded transition-colors disabled:opacity-50"
          aria-label="Refresh stale data"
        >
          <FiRefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    );
  }

  return null;
}
