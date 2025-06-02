import { configureApplication } from './application';
import { configureInfra } from './infra';

export function configureContainer() {
  return configureInfra().extend(configureApplication);
}

export const container = configureContainer();

export default configureContainer;
