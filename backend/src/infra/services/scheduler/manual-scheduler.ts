import { SchedulerStrategy } from '@/application/services';
import { ApiError } from '@/application/errors';

export class ManualSchedulerStrategy implements SchedulerStrategy {
  async schedule(
    input: SchedulerStrategy.Input,
  ): Promise<SchedulerStrategy.Output> {
    if (!input.period || !input.timesPerPeriod) {
      throw new ApiError(
        'Invalid input for manual scheduling. Both period and timesPerPeriod are required.',
        'ManualSchedulerError',
        400,
      );
    }

    return {
      period: input.period,
      timesPerPeriod: input.timesPerPeriod,
    };
  }
}
