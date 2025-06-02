import { Post } from '@/domain';
import { PostRepository, LabelRepository } from '@/application/repositories';
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
    private readonly labelRepository: LabelRepository,
  ) {}

  public async execute(
    input: CreatePostUsecase.Input,
  ): Promise<CreatePostUsecase.Output> {
    const validatedInput = await this.postInputValidator.validate(input);

    const labelResults = await this.labelRepository.list({
      filter: {
        names: validatedInput.labels,
      },
    });

    const newPost = await this.postRepository.create({
      ...validatedInput,
      labels: labelResults.labels,
    });

    return newPost;
  }
}
