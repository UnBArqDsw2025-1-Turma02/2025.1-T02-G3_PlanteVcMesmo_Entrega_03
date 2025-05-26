import { DataSource } from 'typeorm';
import { PostRepository } from '@/application/repositories';
import { PostEntity } from '@/infra/orm/entities';

export class PostTypeormRepository implements PostRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    params: PostRepository.Create.Input,
  ): Promise<PostRepository.Create.Output> {
    const repo = this.dataSource.getRepository(PostEntity);

    const post = repo.create(params);
    const createdPost = await repo.save(post);

    return createdPost;
  }

  async findBy(
    params: PostRepository.FindBy.Input,
  ): Promise<PostRepository.FindBy.Output> {
    const repo = this.dataSource.getRepository(PostEntity);

    const post = await repo.findOne({
      where: params,
      relations: ['user', 'labels'],
    });

    return post;
  }

  async update(
    id: string,
    input: PostRepository.Update.Input,
  ): Promise<PostRepository.Update.Output> {
    const repo = this.dataSource.getRepository(PostEntity);

    const existingPost = await repo.findOne({
      where: { id },
    });

    if (!existingPost) {
      return null;
    }

    const updatedPost = await repo.save({
      ...existingPost,
      input,
    });

    return updatedPost;
  }
}
