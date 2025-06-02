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
                text: `You are Verdant, a friendly and knowledgeable virtual plant care specialist, working for our Website: Plante Vc Mesmo.
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

Now answer this question: ${input.question}`,
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
