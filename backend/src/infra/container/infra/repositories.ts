import { DIContainer } from 'rsdi';
import { dataSource } from '@/infra/orm/datasource';
import { UserRepository, PostRepository, LabelRepository, CommentRepository } from '@/application/repositories'; 

import { UserTypeOrmRepository, PostOrmRepository, LabelOrmRepository, CommentOrmRepository } from '@/infra/orm/repositories'; 


export function configureRepositories() {
  return new DIContainer()
    .add('Datasource', () => dataSource)
    .add(
      UserRepository.name,
      ({ Datasource }) => new UserTypeOrmRepository(Datasource),
    ).add( 
      PostRepository.name,
      ({ Datasource }) => new PostOrmRepository(Datasource),
    )
    .add( 
      LabelRepository.name,
      ({ Datasource }) => new LabelOrmRepository(Datasource),
    )
    .add( 
      CommentRepository.name,
      ({ Datasource }) => new CommentOrmRepository(Datasource),
    );
}

export type RepositoriesDI = ReturnType<typeof configureRepositories>;
