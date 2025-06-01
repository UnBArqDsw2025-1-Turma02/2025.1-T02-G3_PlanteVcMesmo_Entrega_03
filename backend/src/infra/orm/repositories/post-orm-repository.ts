import { PostRepository } from '@/application/repositories';
import { DataSource, Repository } from 'typeorm';
import { PostEntity, UserEntity } from '@/infra/orm/entities';
import { Post } from '@/domain';
import { NotFoundError } from '@/application/errors';

export class PostOrmRepository implements PostRepository {
  private readonly repo: Repository<Post>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(PostEntity);
  }

  async findBy(
    input: PostRepository.FindBy.Input,
  ): Promise<PostRepository.FindBy.Output> {
    const post = await this.repo.findOne({
      where: { id: input.id },
    });

    return post || null;
  }

  async create(
    input: PostRepository.Create.Input,
  ): Promise<PostRepository.Create.Output> {
    const userRepo = this.dataSource.getRepository(UserEntity);
    const user = await userRepo.findOne({ where: { id: input.userId } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const post = this.repo.create({
      title: input.title,
      description: input.description,
      userId: input.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.repo.save(post);
    return post;
  }

  async list(
    input: PostRepository.List.Input,
  ): Promise<PostRepository.List.Output> {
    const [posts, total] = await this.repo.findAndCount({
      where: input.filters,
      skip: (input.pagination.page - 1) * input.pagination.limit,
      take: input.pagination.limit,
    });

    return { posts, total };
  }

  async update(
    id: string,
    input: PostRepository.Update.Input,
  ): Promise<PostRepository.Update.Output> {
    const post = await this.repo.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const postUpdated = await this.repo.save({
      ...post,
      ...input,
      updatedAt: new Date(),
    });

    return postUpdated;
  }

  async delete(
    input: PostRepository.Delete.Input,
  ): Promise<PostRepository.Delete.Output> {
    const post = await this.repo.findOne({ where: { id: input.id } });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    await this.repo.remove(post);
  }
}
