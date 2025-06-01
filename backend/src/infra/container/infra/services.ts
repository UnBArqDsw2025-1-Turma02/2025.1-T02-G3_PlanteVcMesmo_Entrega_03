import { RepositoriesDI } from './repositories';
import { ChatGPTProvider, GeminiProvider } from '@/infra/services/chat';

export function configureServices(container: RepositoriesDI) {
  return container
    .add('ChatGPTLLMProvider', () => new ChatGPTProvider())
    .add('GeminiLLMProvider', () => new GeminiProvider());
}

export type ServicesDI = ReturnType<typeof configureServices>;
