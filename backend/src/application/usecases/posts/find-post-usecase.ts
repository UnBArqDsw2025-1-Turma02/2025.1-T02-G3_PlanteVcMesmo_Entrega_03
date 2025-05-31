import { Post } from '@/domain';

export class FindPostUsecase {
  constructor() {}

  public async execute(
    input: FindPostUsecase.Input,
  ): Promise<FindPostUsecase.Output> {
    throw new Error('Method not implemented.');
  }
}

export namespace FindPostUsecase {
  export type Input = {
    postId: string;
  };
  export type Output = Post | null;
}
