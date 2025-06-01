import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export class DeletePostUsecase {
  constructor(
    private readonly deletePostInputValidator: Validator<DeletePostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: DeletePostUsecase.Input,
  ): Promise<DeletePostUsecase.Output> {
    const validatedInput = await this.deletePostInputValidator.validate(input);

    await this.postRepository.delete({
      id: validatedInput.postId,
    });
  }
}

export namespace DeletePostUsecase {
  export type Input = {
    postId: string;
  };

  export type Output = Promise<void>;
}
