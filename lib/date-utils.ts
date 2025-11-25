import {
  startOfToday,
  differenceInDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  isWithinInterval
} from 'date-fns';
import { ko } from 'date-fns/locale';

export function getDateGroup(date: Date): string {
  const today = startOfToday();
  const daysDiff = differenceInDays(today, date);

  // 오늘
  if (daysDiff === 0) {
    return 'Today';
  }

  // 어제
  if (daysDiff === 1) {
    return 'Yesterday';
  }

  // 그저께
  if (daysDiff === 2) {
    return '2 Days Ago';
  }

  // 이번 주 (일요일 시작)
  const thisWeekStart = startOfWeek(today, { locale: ko });
  const thisWeekEnd = endOfWeek(today, { locale: ko });
  if (isWithinInterval(date, { start: thisWeekStart, end: thisWeekEnd })) {
    return 'This Week';
  }

  // 지난 주
  const lastWeekStart = startOfWeek(subWeeks(today, 1), { locale: ko });
  const lastWeekEnd = endOfWeek(subWeeks(today, 1), { locale: ko });
  if (isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd })) {
    return 'Last Week';
  }

  // 이번 달
  const thisMonthStart = startOfMonth(today);
  if (isWithinInterval(date, { start: thisMonthStart, end: today })) {
    return 'This Month';
  }

  // 이전
  return 'Earlier';
}

export function groupIncidentsByDate<T extends { createdAt: Date }>(
  incidents: T[]
): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  // 날짜순 정렬 (최신순)
  const sorted = [...incidents].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  for (const incident of sorted) {
    const group = getDateGroup(incident.createdAt);
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)!.push(incident);
  }

  // 그룹 순서 정의
  const order = ['Today', 'Yesterday', '2 Days Ago', 'This Week', 'Last Week', 'This Month', 'Earlier'];
  const orderedGroups = new Map<string, T[]>();

  for (const key of order) {
    if (groups.has(key)) {
      orderedGroups.set(key, groups.get(key)!);
    }
  }

  return orderedGroups;
}
