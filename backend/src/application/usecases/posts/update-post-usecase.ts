import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
export namespace UpdatePostUsecase {
  export type Input = {
    id: string;
    fields: PostRepository.Update.Input;
  };
  export type Output = PostRepository.Update.Output;
}

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
      validatedInput.id,
      validatedInput.fields,
    );
    return updatedPost;
  }
}
