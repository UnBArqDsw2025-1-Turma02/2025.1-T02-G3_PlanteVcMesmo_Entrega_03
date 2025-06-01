import { Post } from '@/domain';
import { PostRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export namespace CreatePostUsecase {
  export type Input = {
    title: string;
    description: string;
    userId: string;
    labels: string[];
  };

  export type Output = Post;
}

export class CreatePostUsecase {
  constructor(
    private readonly postInputValidator: Validator<CreatePostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: CreatePostUsecase.Input,
  ): Promise<CreatePostUsecase.Output> {
    const validatedInput = await this.postInputValidator.validate(input);

    const newPost = await this.postRepository.create(validatedInput);
    return newPost;
  }
}
