import { Post } from '@/domain';
import { PostEntity } from '@/infra/orm/entities';
import { dataSource } from '@/infra/orm';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserBuilder } from './user-builder';

export class PostBuilder {
  private dataSource: DataSource;
  private data: Post;

  private constructor() {
    this.dataSource = dataSource;
    this.data = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      userId: 'empty',
    };
  }

  public static aPost(): PostBuilder {
    return new PostBuilder();
  }

  public customParameters(params: Partial<Post>): PostBuilder {
    this.data = {
      ...this.data,
      ...params,
    };

    return this;
  }

  public getData(): Post {
    return this.data;
  }

  public async build(): Promise<Post> {
    if (this.data.userId === 'empty') {
      const { id: userId } = await UserBuilder.anUser().build();
      this.data.userId = userId;
    }

    const postRepo = this.dataSource.getRepository(PostEntity);
    const postEntity = postRepo.create(this.data);

    return await postRepo.save(postEntity);
  }
}
