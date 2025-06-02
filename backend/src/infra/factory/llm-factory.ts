import { LLMType, LLMTypes } from '@/domain';
import { LLMProvider } from '@/application/services';
import { ChatGPTProvider, GeminiProvider } from '@/infra/services/chat';

export class LLMFactory {
  constructor() {}

  public getModuleInstance(item: LLMType): LLMProvider {
    const itemsMap: Record<LLMType, LLMProvider> = {
      [LLMTypes.CHATGPT]: new ChatGPTProvider(),
      [LLMTypes.GEMINI]: new GeminiProvider(),
    };

    if (!itemsMap[item]) {
      throw new Error('Invalid Type');
    }

    return itemsMap[item];
  }
}
