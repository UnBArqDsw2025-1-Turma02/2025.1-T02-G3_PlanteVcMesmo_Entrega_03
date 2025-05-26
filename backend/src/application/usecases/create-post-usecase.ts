import { PostRepository } from '@/application/repositories';
import { dataSource } from '@/infra/orm';
import { PostTypeormRepository } from '@/infra/orm/repositories/post-typeorm-repository';

export namespace CreatePostUseCase {
  export type Input = PostRepository.Create.Input;
  export type Output = PostRepository.Create.Output;
}

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(
    params: CreatePostUseCase.Input,
  ): Promise<CreatePostUseCase.Output> {
    const createdPost = await this.postRepository.create(params);

    return createdPost;
  }
}
