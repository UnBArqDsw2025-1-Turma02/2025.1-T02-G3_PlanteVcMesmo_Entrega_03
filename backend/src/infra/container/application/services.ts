import { InfraDI } from '../infra';
import { ManualSchedulerStrategy } from '@/infra/services/scheduler/manual-scheduler';
import { AutomaticSchedulerStrategy } from '@/infra/services/scheduler/automatic-scheduler';
import {
  EncryptionCryptoService,
  GoogleAuthService,
} from '@/infra/application/services';
import { JwtServiceImpl } from '@/infra/services';
import { SchedulerStrategyExecutor } from '@/application/services';
import { StrategyFactory } from '@/infra/factory';

export function configureServices(container: InfraDI) {
  return container
    .add('ManualSchedulerStrategy', () => new ManualSchedulerStrategy())
    .add('AutomaticSchedulerStrategy', ({ GeminiLLMProvider }) => {
      return new AutomaticSchedulerStrategy(GeminiLLMProvider);
    })
    .add('EncryptionService', () => new EncryptionCryptoService())
    .add('GoogleAuthService', () => new GoogleAuthService())
    .add('JwtService', () => new JwtServiceImpl())
    .add(
      'SchedulerStrategyExecutor',
      ({ ManualSchedulerStrategy }) =>
        new SchedulerStrategyExecutor(ManualSchedulerStrategy),
    )
    .add('StrategyFactory', () => new StrategyFactory());
}

export type ServicesDI = ReturnType<typeof configureServices>;
