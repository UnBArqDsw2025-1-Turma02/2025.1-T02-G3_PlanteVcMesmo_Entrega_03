import { configureRepositories } from './repositories';

export function configureInfra() {
  return configureRepositories();
}

export type InfraDI = ReturnType<typeof configureInfra>;
