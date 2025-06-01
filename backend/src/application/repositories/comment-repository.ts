import { Comment } from '@/domain/comment'; 

export namespace CommentRepository { 
  export const name = 'CommentRepository'; 

  export namespace FindBy { 
    export type Input = { 
      id: string;
    };
    
    export type Output = Comment | null; 
  }

  export namespace Create { 
    export type Input = { 
      userId: string; 
      postId: string; 
      content: string; 
    };
    export type Output = Comment; 
  }

  export namespace List { 
    export type Input = {
      filters?: { 
        userId?: string; 
        postId?: string; 
      };
      pagination: { 
        page: number; 
        limit: number; 
      };
    };
    export type Output = { 
      comments: Comment[];
      total: number;
    };
  }

  export namespace Update { 
    export type Input = Partial<Omit<Comment, 'createdAt' | 'userId' | 'postId'>>; 
    export type Output = Comment; 
  }

  export namespace Delete { 
    export type Input = { 
      id: string;
    };
    export type Output = void; 
  }
}

export interface CommentRepository { 
  findBy(
    input: CommentRepository.FindBy.Input
  ): Promise<CommentRepository.FindBy.Output>; 
  create(
    input: CommentRepository.Create.Input
  ): Promise<CommentRepository.Create.Output>; 
  list(
    input: CommentRepository.List.Input
  ): Promise<CommentRepository.List.Output>; 
  update(
    id: string, 
    input: CommentRepository.Update.Input
  ): Promise<CommentRepository.Update.Output>; 
  delete(
    input: CommentRepository.Delete.Input
  ): Promise<CommentRepository.Delete.Output>; 
}