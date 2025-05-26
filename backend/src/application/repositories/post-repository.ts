import { Post } from '@/domain';

export namespace PostRepository {
  export const name = 'PostRepository';

  export namespace Create {
    export type Input = Post;
    export type Output = Post;
  }

  export namespace FindBy {
    export type Input = Partial<{
      id: string;
      userId: string;
    }>;

    export type Output = Post | null;
  }

  export namespace Update {
    export type Input = Partial<Omit<Post, 'id' | 'user'>>;
    export type Output = Post | null;
  }
}

export interface PostRepository {
  create(
    params: PostRepository.Create.Input,
  ): Promise<PostRepository.Create.Output>;
  findBy(
    params: PostRepository.FindBy.Input,
  ): Promise<PostRepository.FindBy.Output>;
  update(
    id: string,
    input: PostRepository.Update.Input,
  ): Promise<PostRepository.Update.Output>;
}
