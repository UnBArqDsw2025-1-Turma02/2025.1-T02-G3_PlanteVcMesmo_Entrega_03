import { Post } from '@/domain';

export class DeletePostUsecase {
  constructor() {}

  public async execute(
    input: DeletePostUsecase.Input,
  ): Promise<DeletePostUsecase.Output> {
    throw new Error('Method not implemented.');
  }
}

export namespace DeletePostUsecase {
  export type Input = {
    postId: string;
  };
  export type Output = Promise<void>;
}
