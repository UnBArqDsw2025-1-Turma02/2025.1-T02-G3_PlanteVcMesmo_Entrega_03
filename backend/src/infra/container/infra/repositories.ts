import { DIContainer } from 'rsdi';
import { dataSource } from '@/infra/orm/datasource';
import { UserRepository } from '@/application/repositories';
import { UserTypeOrmRepository } from '@/infra/orm/repositories';

export function configureRepositories() {
  return new DIContainer()
    .add('Datasource', () => dataSource)
    .add(
      UserRepository.name,
      ({ Datasource }) => new UserTypeOrmRepository(Datasource),
    );
}

export type RepositoriesDI = ReturnType<typeof configureRepositories>;
