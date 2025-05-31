import { InfraDI } from '@/infra/container/infra';
import { ManualSchedulerStrategy } from '@/infra/services/manual-scheduler';
import { AutomaticSchedulerStrategy } from '@/infra/services/automatic-scheduler';
import { LLMProvider } from '@/infra/services/llm-provider';

export function configureServices(container: InfraDI) {
  container.add('ManualSchedulerStrategy', () => new ManualSchedulerStrategy());
  container.add('AutomaticSchedulerStrategy', () => {
    const llmProvider = new LLMProvider();
    return new AutomaticSchedulerStrategy(llmProvider);
  });

  return container;
}

export type ServicesDI = ReturnType<typeof configureServices>;
