import { CalendarPeriod, CalendarPlant } from '@/domain';

export class SchedulerStrategyExecutor {
  private strategy: SchedulerStrategy;

  constructor(strategy: SchedulerStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SchedulerStrategy): void {
    this.strategy = strategy;
  }

  async execute(
    input: SchedulerStrategy.Input,
  ): Promise<SchedulerStrategy.Output> {
    return await this.strategy.schedule(input);
  }
}

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
