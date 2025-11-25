import { useState, useEffect, useMemo } from 'react';
import type { Incident } from '@/lib/api/types';

export interface FilterState {
  serviceFilter: string;
  impactFilter: string;
  statusFilter: string;
  searchQuery: string;
}

export interface ExternalFilter {
  type: 'impact' | 'status' | 'all';
  value: string;
}

/**
 * Custom hook for managing incident filters
 * @param incidents - Array of incidents to filter
 * @param externalFilter - External filter to apply
 * @param debouncedSearchQuery - Debounced search query
 * @returns Filtered incidents and filter state setters
 */
export function useIncidentFilters(
  incidents: Incident[],
  externalFilter: ExternalFilter | null | undefined,
  debouncedSearchQuery: string
) {
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Apply external filter
  useEffect(() => {
    if (externalFilter) {
      if (externalFilter.type === 'impact') {
        setImpactFilter(externalFilter.value);
      } else if (externalFilter.type === 'status') {
        setStatusFilter(externalFilter.value);
      } else if (externalFilter.type === 'all') {
        setServiceFilter('all');
        setImpactFilter('all');
        setStatusFilter('all');
      }
    }
  }, [externalFilter]);

  // Filter incidents based on all criteria
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      // Service filter
      if (serviceFilter !== 'all') {
        const serviceName = incident.name.match(/\[(.*?)\]/)?.[1];
        if (serviceName !== serviceFilter) return false;
      }

      // Impact filter
      if (impactFilter !== 'all' && incident.impact !== impactFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'active' && incident.status === 'resolved') {
          return false;
        }
        if (statusFilter === 'resolved' && incident.status !== 'resolved') {
          return false;
        }
      }

      // Search filter (debounced)
      if (debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.toLowerCase();
        const name = incident.name.toLowerCase();
        const latestUpdate = incident.updates?.[0]?.body.toLowerCase() || '';

        if (!name.includes(query) && !latestUpdate.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [incidents, serviceFilter, impactFilter, statusFilter, debouncedSearchQuery]);

  return {
    filteredIncidents,
    serviceFilter,
    setServiceFilter,
    impactFilter,
    setImpactFilter,
    statusFilter,
    setStatusFilter,
  };
}
