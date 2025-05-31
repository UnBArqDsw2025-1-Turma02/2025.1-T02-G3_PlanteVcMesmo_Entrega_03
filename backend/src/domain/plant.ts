export const CalendarPeriods = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  DAILY: 'DAILY',
} as const;

export type CalendarPeriod = keyof typeof CalendarPeriods;
