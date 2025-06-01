import { configureRepositories } from './repositories';
import { configureServices } from './services';

export function configureInfra() {
  return configureRepositories().extend(configureServices);
}

export type InfraDI = ReturnType<typeof configureInfra>;
