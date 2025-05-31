import { Post } from '@/domain';
import { PostRepository } from '../../../domain/postRepository';
import { Validator } from '../../services/validator.interface';

export namespace CreatePostUsecase {
  export type Input = {
    title: string;
    content: string;
    authorId: string;
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
    await this.postInputValidator.validate(input);

    const postDataToCreate: PostRepository.Create.Input = {
      title: input.title,
      content: input.content,
      authorId: input.authorId,
    };

    const newPost = await this.postRepository.create(postDataToCreate);

    return newPost;
  }
}
