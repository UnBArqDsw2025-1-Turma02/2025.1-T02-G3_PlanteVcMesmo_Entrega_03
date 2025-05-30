import { SchedulerStrategy } from '@/application/services/scheduler-strategy';
import { LLMProvider } from '@/infra/services/llm-provider';

export class AutomaticSchedulerStrategy implements SchedulerStrategy {
  constructor(private readonly llmProvider: LLMProvider) {}

  async schedule(
    input: SchedulerStrategy.Input,
  ): Promise<SchedulerStrategy.Output> {
    const suggestion = await this.llmProvider.getWateringSuggestion(input);
    return { wateringPeriod: suggestion };
  }
}