import { Post } from '@/domain';

export class CreatePostUsecase {
  constructor() {}

  public async execute(
    input: CreatePostUsecase.Input,
  ): Promise<CreatePostUsecase.Output> {
    throw new Error('Method not implemented.');
  }
}

export namespace CreatePostUsecase {
  export type Input = Omit<Post, 'id'>;
  export type Output = Post;
}
