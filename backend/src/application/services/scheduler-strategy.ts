import { CalendarPeriod, CalendarPlant } from '@/domain';

export namespace SchedulerStrategy {
  export type Input = CalendarPlant;
  export type Output = {
    period: CalendarPeriod;
    timesPerPeriod: number;
  };
}

export interface SchedulerStrategy {
  schedule(input: SchedulerStrategy.Input): Promise<SchedulerStrategy.Output>;
}
