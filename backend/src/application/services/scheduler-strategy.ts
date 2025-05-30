export namespace SchedulerStrategy {
    export type Input = {
      plantName: string;
      speciesName: string;
      isOutdoor: boolean;
      isIlluminated: boolean;
      state: string;
    };
  
    export type Output = {
      wateringPeriod: string;
    };
  }
  
  export interface SchedulerStrategy {
    schedule(input: SchedulerStrategy.Input): Promise<SchedulerStrategy.Output>;
  }