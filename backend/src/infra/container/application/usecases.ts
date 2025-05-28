import { ServicesDI } from './services';

export function configureUseCases(container: ServicesDI) {
  return container;
}

export type UseCasesDI = ReturnType<typeof configureUseCases>;
