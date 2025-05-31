import { LLMProvider } from '@/application/services';
import { HTTPBase } from '@/infra/services';
import { LLMProviderError } from '@/application/errors';
import logger from '@/infra/logger';
import env from '@/env';

export class ChatGPTProvider extends HTTPBase implements LLMProvider {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor() {
    super();

    this.apiKey = env.CHAT_API_KEY;
    this.apiUrl = env.CHAT_API_URL;
    this.model = env.CHAT_MODEL;
  }

  async chat(input: LLMProvider.Chat.Input): Promise<LLMProvider.Chat.Output> {
    const response = await this.request({
      method: 'POST',
      url: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that provides watering suggestions for plants.',
          },
          {
            role: 'user',
            content: `Provide an answer to the following question: ${input.question}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
    });

    if (!response.success) {
      logger.info(`LLM response error: ${JSON.stringify(response.data)}`);
      throw new LLMProviderError(
        'Failed to fetch response from LLM provider',
        'LLMProviderError',
        response.status,
        response.data,
      );
    }

    logger.info(`LLM response: ${JSON.stringify(response.data)}`);

    const answer = response.data.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      throw new LLMProviderError('No answer provided by the LLM');
    }

    return {
      answer,
    };
  }
}
