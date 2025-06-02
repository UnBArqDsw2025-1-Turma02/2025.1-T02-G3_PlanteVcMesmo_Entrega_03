import { dataSource } from '@/infra/orm';
import { beforeAll, describe, expect, it } from 'vitest';
import { PostOrmRepository } from '@/infra/orm/repositories';
import { PostBuilder } from '@/test/helpers';
import { Post } from '@/domain';

describe('Update - PostTypeormRepository', () => {
  let postRepository: PostOrmRepository;
  let post: Post;

  beforeAll(async () => {
    await dataSource.initialize();
    postRepository = new PostOrmRepository(dataSource);
    const postBuilder = PostBuilder.aPost();
    post = postBuilder.getData();
    await postBuilder.build();
  });

  it('should be able to update a post', async () => {
    const updatedPost = await postRepository.update(post.id, {
      title: 'Updated Title',
    });

    expect(updatedPost).toBeDefined();
    expect(updatedPost.title).toBe('Updated Title');
  });
});
