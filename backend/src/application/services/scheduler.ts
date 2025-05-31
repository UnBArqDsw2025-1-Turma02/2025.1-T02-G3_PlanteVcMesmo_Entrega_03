import { SchedulerStrategy } from './scheduler-strategy';

export class Scheduler {
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
    return this.strategy.schedule(input);
  }
}
