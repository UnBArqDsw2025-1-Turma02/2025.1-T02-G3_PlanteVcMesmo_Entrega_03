import { LLMProvider } from '@/application/services';
import { HTTPBase } from '@/infra/services';
import { LLMProviderError } from '@/application/errors';
import logger from '@/infra/logger';
import env from '@/env';

export class GeminiProvider extends HTTPBase implements LLMProvider {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    super();
    this.apiKey = env.GEMINI_API_KEY;
    this.apiUrl = env.GEMINI_API_URL;
  }

  async chat(input: LLMProvider.Chat.Input): Promise<LLMProvider.Chat.Output> {
    const response = await this.request({
      method: 'POST',
      url: `${this.apiUrl}?key=${this.apiKey}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a helpful assistant that provides watering suggestions for plants. Now answer this question: ${input.question}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        },
      },
    });

    if (!response.success) {
      logger.info(`LLM response error: ${JSON.stringify(response.data)}`);
      throw new LLMProviderError(
        'Failed to fetch response from Gemini',
        'LLMProviderError',
        response.status,
        response.data,
      );
    }

    logger.info(`LLM response: ${JSON.stringify(response.data)}`);

    const answer =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!answer) {
      throw new LLMProviderError('No answer provided by Gemini');
    }

    logger.info(`Returning answer: ${answer}`);

    return {
      answer,
    };
  }
}
