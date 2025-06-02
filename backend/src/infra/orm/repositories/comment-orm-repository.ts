import { CommentRepository } from '@/application/repositories'; 
import { DataSource, Repository } from 'typeorm';
import { CommentEntity, UserEntity, PostEntity } from '@/infra/orm/entities'; 
import { Comment } from '@/domain/comment'; 
import { NotFoundError } from '@/application/errors'; 

export class CommentOrmRepository implements CommentRepository {
  private readonly repo: Repository<Comment>; 

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(CommentEntity); 
  }

  async findBy(
    input: CommentRepository.FindBy.Input,
  ): Promise<CommentRepository.FindBy.Output> {
    const comment = await this.repo.findOne({
      where: { id: input.id },
    });

    return comment || null; 
  }

  async create(
      input: CommentRepository.Create.Input,
    ): Promise<CommentRepository.Create.Output> {

        const userRepo = this.dataSource.getRepository(UserEntity);
        const user = await userRepo.findOne({ where: { id: input.userId } });
        if (!user) {
            throw new NotFoundError('User not found');
        }
            
        const postRepo = this.dataSource.getRepository(PostEntity);
        const post = await postRepo.findOne({ where : {id : input.postId} });
        if (!post) {
            throw new NotFoundError('Post not found');
        }

        const comment = this.repo.create({
            userId: input.userId,
            postId: input.postId,
            content: input.content,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.repo.save(comment);
        return comment;
    }

  async list(
    input: CommentRepository.List.Input,
  ): Promise<CommentRepository.List.Output> {
    const [comments, total] = await this.repo.findAndCount({
      where: input.filters,
      skip: (input.pagination.page - 1) * input.pagination.limit,
      take: input.pagination.limit,
    });

    return { comments, total };
  }

  async update(
    id: string,
    input: CommentRepository.Update.Input,
  ): Promise<CommentRepository.Update.Output> {
    const comment = await this.repo.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundError('comment not found');
    }

    const commentUpdated = await this.repo.save({
      ...comment,
      ...input,
      updatedAt: new Date(),
    });

    return commentUpdated;
  }

  async delete(
    input: CommentRepository.Delete.Input,
  ): Promise<CommentRepository.Delete.Output> {
    const comment = await this.repo.findOne({ where: { id: input.id } });

    if (!comment) {
      throw new NotFoundError('comment not found');
    }

    await this.repo.remove(comment);
  }
}