import { configureInfra } from '@/infra/container/infra';
import { configureServices } from './services';
import { configureUseCases } from './usecases';

export function configureApplication() {
  return configureInfra().extend(configureServices).extend(configureUseCases);
}

export type ApplicationDI = ReturnType<typeof configureApplication>;
