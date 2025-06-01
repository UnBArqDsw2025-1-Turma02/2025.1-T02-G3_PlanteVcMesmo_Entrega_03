import { Post } from '@/domain';
import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export namespace FindPostUsecase {
  export type Input = {
    postId: string;
  };
  export type Output = Post | null;
}

export class FindPostUsecase {
  constructor(
    private readonly findPostInputValidator: Validator<FindPostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: FindPostUsecase.Input,
  ): Promise<FindPostUsecase.Output> {
    const validatedInput = await this.findPostInputValidator.validate(input);
    const post = await this.postRepository.findBy({
      id: validatedInput.postId,
    });
    return post;
  }
}
