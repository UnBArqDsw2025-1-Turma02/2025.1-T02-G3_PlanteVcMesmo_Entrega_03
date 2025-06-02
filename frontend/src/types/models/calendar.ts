export const CalendarPeriods = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  DAILY: 'DAILY',
} as const;

export type CalendarPlant = {
  plantName: string;
  speciesName: string;
  isOutdoor: boolean;
  isIlluminated: boolean;
  state: string;
  period?: CalendarPeriod;
  timesPerPeriod?: number;
};

export type CalendarPeriod = keyof typeof CalendarPeriods;