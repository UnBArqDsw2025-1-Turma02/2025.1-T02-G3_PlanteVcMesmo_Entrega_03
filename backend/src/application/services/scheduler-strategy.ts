import { CalendarPeriod } from '@/domain';

export namespace SchedulerStrategy {
  export type Input = {
    plantName: string;
    speciesName: string;
    isOutdoor: boolean;
    isIlluminated: boolean;
    state: string;
    period?: CalendarPeriod;
    timesPerPeriod?: number;
  };

  export type Output = {
    period: CalendarPeriod;
    timesPerPeriod: number;
  };
}

export interface SchedulerStrategy {
  schedule(input: SchedulerStrategy.Input): Promise<SchedulerStrategy.Output>;
}
