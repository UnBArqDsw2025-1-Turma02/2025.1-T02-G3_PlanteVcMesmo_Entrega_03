import { dataSource } from '@/infra/orm';
import { beforeAll, describe, expect, it } from 'vitest';
import { PostOrmRepository } from '@/infra/orm/repositories';
import { PostBuilder } from '@/test/helpers';
import { Post } from '@/domain';
import { faker } from '@faker-js/faker';

describe('FindBy - PostTypeormRepository', () => {
  let postRepository: PostOrmRepository;
  let post: Post;

  beforeAll(async () => {
    await dataSource.initialize();
    postRepository = new PostOrmRepository(dataSource);
    const postBuilder = PostBuilder.aPost();
    post = postBuilder.getData();
    await postBuilder.build();
  });

  it('should be able to find a post by id', async () => {
    const findedPost = await postRepository.findBy({ id: post.id });
    expect(findedPost).toBeDefined();
  });
  it('should return null if post not found', async () => {
    const findedPost = await postRepository.findBy({ id: faker.string.uuid() });
    expect(findedPost).toBeNull();
  });
});
