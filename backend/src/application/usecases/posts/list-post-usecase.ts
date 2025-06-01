import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export class ListPostUsecase {
  constructor(
    private readonly postInputValidator: Validator<ListPostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: ListPostUsecase.Input,
  ): Promise<ListPostUsecase.Output> {
    const validatedInput = await this.postInputValidator.validate(input);
    const posts = await this.postRepository.list(validatedInput);
    return posts;
  }
}

export namespace ListPostUsecase {
  export type Input = PostRepository.List.Input;
  export type Output = PostRepository.List.Output;
}
