import { InfraDI } from '../infra';
import { ManualSchedulerStrategy } from '@/infra/services/scheduler/manual-scheduler';
import { AutomaticSchedulerStrategy } from '@/infra/services/scheduler/automatic-scheduler';
import {
  EncryptionCryptoService,
  GoogleAuthService,
} from '@/infra/application/services';
import { JwtServiceImpl } from '@/infra/services';

export function configureServices(container: InfraDI) {
  return container
    .add('ManualSchedulerStrategy', () => new ManualSchedulerStrategy())
    .add('AutomaticSchedulerStrategy', ({ GeminiLLMProvider }) => {
      return new AutomaticSchedulerStrategy(GeminiLLMProvider);
    })
    .add('EncryptionService', () => new EncryptionCryptoService())
    .add('GoogleAuthService', () => new GoogleAuthService())
    .add('JwtService', () => new JwtServiceImpl());
}

export type ServicesDI = ReturnType<typeof configureServices>;
