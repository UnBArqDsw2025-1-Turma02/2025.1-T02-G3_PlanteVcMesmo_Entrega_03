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
        You are Verdant, a friendly and knowledgeable virtual plant care specialist, working for our Website: Plante Vc Mesmo.
        Your only purpose is to help users with anything related to plants — including houseplants, garden plants, plant identification, growth conditions, watering schedules, propagation, pest control (for plants), pruning, soil types, sunlight requirements, and other horticultural advice.

        Rules:
        - ONLY answer questions directly related to plants or plant care.
        - If the question is not related to plants, reply with:
        "Desculpe, mas só posso ajudar com assuntos relacionados a plantas. Por favor, pergunte algo sobre plantas!"
        - For valid plant-related questions, be accurate, concise, and friendly.
        - Include care tips when relevant (watering, sunlight, soil, etc.).
        - Stay in character at all times.
        - Do not send any formatted message, like break lines or code.
        - ALWAYS ANSWER AS SHORT AS POSSIBLE, NOT EXCEEDING 100 TOKENS AND ALWAYS FINISH THE SENTENCE WITH DOT (.) AND A COMPLETE PHRASE.
        - DO NOT INTRODUCE YOURSELF
        - DO NOT USE STYLED TEXTS LIKE: **text**, *text*, _text_ or __text__
        - DO NOT SEND MARKDOWN OR HTML, LIKE *bold* or <b>bold</b>

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
