import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export class UpdatePostUsecase {
  constructor(
    private readonly updatePostInputValidator: Validator<UpdatePostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: UpdatePostUsecase.Input,
  ): Promise<UpdatePostUsecase.Output> {
    const validatedInput = await this.updatePostInputValidator.validate(input);
    const updatedPost = await this.postRepository.update(
      validatedInput.postId,
      validatedInput.fields,
    );

    return updatedPost;
  }
}

export namespace UpdatePostUsecase {
  export type Input = {
    postId: string;
    fields: PostRepository.Update.Input;
  };
  export type Output = PostRepository.Update.Output;
}
