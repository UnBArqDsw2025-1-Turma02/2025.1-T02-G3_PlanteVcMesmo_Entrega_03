import { Post } from '@/domain';

export class UpdatePostUsecase {
  constructor() {}

  public async execute(
    input: UpdatePostUsecase.Input,
  ): Promise<UpdatePostUsecase.Output> {
    throw new Error('Method not implemented.');
  }
}

export namespace UpdatePostUsecase {
  export type Input = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
  export type Output = Post;
}
