import { dataSource } from '@/infra/orm';
import { beforeAll, describe, expect, it } from 'vitest';
import { PostOrmRepository } from '@/infra/orm/repositories';
import { PostBuilder } from '@/test/helpers';
import { Post } from '@/domain';

describe('Delete - PostTypeormRepository', () => {
  let postRepository: PostOrmRepository;
  let post: Post;

  beforeAll(async () => {
    await dataSource.initialize();
    postRepository = new PostOrmRepository(dataSource);
    const postBuilder = PostBuilder.aPost();
    post = postBuilder.getData();
    await postBuilder.build();
  });

  it('should be able to delete a post', async () => {
    const firstCall = await postRepository.findBy({ id: post.id });
    expect(firstCall).toBeDefined();
    await postRepository.delete({ id: post.id });
    const secondCall = await postRepository.findBy({ id: post.id });
    expect(secondCall).toBeNull();
  });
});
