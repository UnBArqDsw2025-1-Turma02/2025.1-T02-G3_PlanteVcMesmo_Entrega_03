import { Post } from '@/domain'; 
import { PostRepository } from '@/application/repositories'; 
import { Validator } from '@/application/services';

export namespace ListPostUsecase {
  export type Input = {
    page?: number;
    limit?: number;
    filters?: {
    };
  };

  export type Output = {
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ListPostUsecase {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_LIMIT = 10;

  constructor(
    private readonly listPostInputValidator: Validator<ListPostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: ListPostUsecase.Input,
  ): Promise<ListPostUsecase.Output> {
    await this.listPostInputValidator.validate(input);

    const page = input.page || this.DEFAULT_PAGE;
    const limit = input.limit || this.DEFAULT_LIMIT;

    const repositoryInput: PostRepository.List.Input = {
      pagination: {
        page,
        limit,
      },
      filters: input.filters || {}, 
    };

    const repositoryOutput = await this.postRepository.list(repositoryInput);

    return {
      posts: repositoryOutput.posts,
      total: repositoryOutput.total,
      page, 
      limit, 
      totalPages: Math.ceil(repositoryOutput.total / limit),
    };
  }
}
