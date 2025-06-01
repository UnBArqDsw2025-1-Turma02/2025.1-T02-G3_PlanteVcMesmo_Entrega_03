import { InfraDI } from '../infra';
import { ManualSchedulerStrategy } from '@/infra/services/scheduler/manual-scheduler';
import { AutomaticSchedulerStrategy } from '@/infra/services/scheduler/automatic-scheduler';

export function configureServices(container: InfraDI) {
  return container
    .add('ManualSchedulerStrategy', () => new ManualSchedulerStrategy())
    .add('AutomaticSchedulerStrategy', ({ GeminiLLMProvider }) => {
      return new AutomaticSchedulerStrategy(GeminiLLMProvider);
    });
}

export type ServicesDI = ReturnType<typeof configureServices>;
