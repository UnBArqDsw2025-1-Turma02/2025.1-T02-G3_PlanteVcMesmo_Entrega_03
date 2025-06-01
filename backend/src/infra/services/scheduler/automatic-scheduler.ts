import { SchedulerStrategy } from '@/application/services';
import { LLMProvider } from '@/application/services';
import { ApiError } from '@/application/errors';

export class AutomaticSchedulerStrategy implements SchedulerStrategy {
  constructor(private readonly llmProvider: LLMProvider) {}

  async schedule(
    input: SchedulerStrategy.Input,
  ): Promise<SchedulerStrategy.Output> {
    const suggestion = await this.getWateringSuggestion(input);
    return suggestion as SchedulerStrategy.Output;
  }

  private async getWateringSuggestion(
    input: SchedulerStrategy.Input,
  ): Promise<{ period: string; timesPerPeriod: number }> {
    const additionalContext = `The plant is located in ${input.state}, and it is ${
      input.isOutdoor ? 'outdoor' : 'indoor'
    }. The area is ${input.isIlluminated ? 'well-lit' : 'shaded'}.`;

    const prompt = `
      Based on the following details, provide a watering schedule for the plant, sending
      only a JSON object with the period and timesPerPeriod:
      - Plant Name: ${input.plantName}
      - Species Name: ${input.speciesName}
      - Location: ${input.state}
      - Outdoor: ${input.isOutdoor ? 'Yes' : 'No'}
      - Illuminated: ${input.isIlluminated ? 'Yes' : 'No'}
      ${additionalContext}
      The watering frequency should be in one of the list, in uppercase:
      - DAILY
      - WEEKLY
      - MONTHLY
      - YEARLY
      Reminder: send ONLY A JSON object like this, NOTHING MORE!
      DO NOT SEND ANY TEXT OR EXPLANATION, NOT EVEN A MARKDOWN CODE BLOCK:
      {
        "period": "DAILY",
        "timesPerPeriod": 2
      }
      `;

    const response = await this.llmProvider.chat({
      question: prompt,
    });

    if (!response.answer) {
      throw new ApiError(
        'No watering suggestion provided by the LLM',
        'LLMProviderError',
        500,
      );
    }

    try {
      // Extract the JSON block from the LLM response
      const jsonMatch = response.answer.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new ApiError(
          'Could not extract JSON from LLM response',
          'LLMProviderError',
          500,
        );
      }

      const suggestion = JSON.parse(jsonMatch[0]);

      if (
        !suggestion.period ||
        !suggestion.timesPerPeriod ||
        typeof suggestion.timesPerPeriod !== 'number'
      ) {
        throw new ApiError(
          'Invalid watering suggestion format from LLM',
          'LLMProviderError',
          500,
        );
      }

      return suggestion;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      throw new ApiError(
        'Failed to parse watering suggestion from LLM',
        'LLMProviderError',
        500,
      );
    }
  }
}
