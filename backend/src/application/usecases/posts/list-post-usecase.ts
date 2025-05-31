import { Post } from '@/domain';

export class ListPostUsecase {
  constructor() {}

  public async execute(
    input: ListPostUsecase.Input,
  ): Promise<ListPostUsecase.Output> {
    throw new Error('Method not implemented.');
  }
}

export namespace ListPostUsecase {
  export type Input = {
    page?: number;
    limit?: number;
  };

  export type Output = Post[];
}
