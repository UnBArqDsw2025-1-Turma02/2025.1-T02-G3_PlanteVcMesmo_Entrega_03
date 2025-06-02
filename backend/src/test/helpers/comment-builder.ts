import { Comment } from '@/domain';
import { CommentEntity } from '@/infra/orm/entities';
import { dataSource } from '@/infra/orm';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserBuilder } from './user-builder';
import { PostBuilder } from './post-builder';

export class CommentBuilder {
  private dataSource: DataSource;
  private data: Comment;

  private constructor() {
    this.dataSource = dataSource;
    this.data = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      content: faker.lorem.sentence(),
      userId: 'empty',
      postId: 'empty',
    };
  }

  public static aComment(): CommentBuilder {
    return new CommentBuilder();
  }

  public customParameters(params: Partial<Comment>): CommentBuilder {
    this.data = {
      ...this.data,
      ...params,
    };

    return this;
  }

  public getData(): Comment {
    return this.data;
  }

  public async build(): Promise<Comment> {
    if (this.data.userId === 'empty') {
      const { id: userId } = await UserBuilder.anUser().build();
      this.data.userId = userId;
    }

    if (this.data.postId === 'empty') {
      const { id: postId } = await PostBuilder.aPost().build();
      this.data.postId = postId;
    }

    const commentRepo = this.dataSource.getRepository(CommentEntity);
    const commentEntity = commentRepo.create(this.data);

    return await commentRepo.save(commentEntity);
  }
}