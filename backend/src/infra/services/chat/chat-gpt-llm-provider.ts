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
            content: `
        You are Verdant, a friendly and knowledgeable virtual plant care specialist. 
        Your only purpose is to help users with anything related to plants — including houseplants, garden plants, plant identification, growth conditions, watering schedules, propagation, pest control (for plants), pruning, soil types, sunlight requirements, and other horticultural advice.

        Rules:
        - ONLY answer questions directly related to plants or plant care.
        - If the question is not related to plants, reply with:
          "I’m here to assist only with plant-related topics. Please ask me something about plants!"
        - For valid plant-related questions, be accurate, concise, and friendly.
        - Include care tips when relevant (watering, sunlight, soil, etc.).
        - Stay in character at all times.

        REMEMBER: ONLY ANSWER IN BRAZILIAN PORTUGUESE!!!
            `,
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
