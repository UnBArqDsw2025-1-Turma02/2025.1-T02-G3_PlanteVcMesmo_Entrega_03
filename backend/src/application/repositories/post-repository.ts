import { Post } from '@/domain/post';

export namespace PostRepository {
  export const name = 'PostRepository';

  export namespace FindBy {
    export type Input = {
      id: string;
    };

    export type Output = Post | null;
  }

  export namespace Create {
    export type Input = Post;
    export type Output = Post;
  }

  export namespace List {
    export type Input = {
      filters: {
        userId?: string;
      };
      pagination: {
        page: number;
        limit: number;
      };
    };

    export type Output = {
      posts: Post[];
      total: number;
    };
  }

  export namespace Update {
    export type Input = Partial<Omit<Post, 'createdAt'>>;
    export type Output = Post;
  }
}

export interface PostRepository {
  update(
    id: string,
    input: PostRepository.Update.Input,
  ): Promise<PostRepository.Update.Output>;
  findBy(
    input: PostRepository.FindBy.Input,
  ): Promise<PostRepository.FindBy.Output>;
  create(
    input: PostRepository.Create.Input,
  ): Promise<PostRepository.Create.Output>;
  list(input: PostRepository.List.Input): Promise<PostRepository.List.Output>;
}
