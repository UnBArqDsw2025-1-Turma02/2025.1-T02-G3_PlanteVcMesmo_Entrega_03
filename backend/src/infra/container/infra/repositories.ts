import { DIContainer } from 'rsdi';
import { dataSource } from '@/infra/orm/datasource';

export function configureRepositories() {
  return new DIContainer().add('Datasource', () => dataSource);
}
