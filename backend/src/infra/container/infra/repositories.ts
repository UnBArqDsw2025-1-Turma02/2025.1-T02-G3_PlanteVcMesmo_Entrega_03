import { DIContainer } from 'rsdi';
import { dataSource } from '@/infra/orm/datasource';
import {
  UserRepository,
  PostRepository,
  LabelRepository,
} from '@/application/repositories';
import {
  UserTypeOrmRepository,
  PostOrmRepository,
  LabelOrmRepository,
} from '@/infra/orm/repositories';

export function configureRepositories() {
  return new DIContainer()
    .add('Datasource', () => dataSource)
    .add(
      UserRepository.name,
      ({ Datasource }) => new UserTypeOrmRepository(Datasource),
    )
    .add(PostRepository.name, ({ Datasource }) => {
      return new PostOrmRepository(Datasource);
    })
    .add(LabelRepository.name, ({ Datasource }) => {
      return new LabelOrmRepository(Datasource);
    });
}

export type RepositoriesDI = ReturnType<typeof configureRepositories>;
