import { RepositoriesDI } from './repositories';
import { ChatGPTProvider, GeminiProvider } from '@/infra/services/chat';
import { LLMFactory } from '@/infra/factory';

export function configureServices(container: RepositoriesDI) {
  return container
    .add('ChatGPTLLMProvider', () => new ChatGPTProvider())
    .add('GeminiLLMProvider', () => new GeminiProvider())
    .add('LLMFactory', () => new LLMFactory());
}

export type ServicesDI = ReturnType<typeof configureServices>;
