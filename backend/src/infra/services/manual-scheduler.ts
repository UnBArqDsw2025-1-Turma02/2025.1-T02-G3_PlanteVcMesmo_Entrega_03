import { SchedulerStrategy } from '@/application/services/scheduler-strategy';

export class ManualSchedulerStrategy implements SchedulerStrategy {
  async schedule(
    input: SchedulerStrategy.Input,
  ): Promise<SchedulerStrategy.Output> {
    return { wateringPeriod: '7 days' };
  }
}