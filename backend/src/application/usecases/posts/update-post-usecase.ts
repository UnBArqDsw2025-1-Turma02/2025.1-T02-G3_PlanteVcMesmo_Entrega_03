import { Post } from '@/domain';
import { PostRepository } from '@/domain/postRepository';
import { Validator } from '@/application/services/validator.interface'; 

// Namespace definido ANTES da classe
export namespace UpdatePostUsecase {
  export type Input = {
    id: string;
    title?: string;
    content?: string;
  };

  export type Output = Post | null; 
}

export class UpdatePostUsecase {
  constructor(
    private readonly updatePostInputValidator: Validator<UpdatePostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: UpdatePostUsecase.Input,
  ): Promise<UpdatePostUsecase.Output> {
    await this.updatePostInputValidator.validate(input);

    const { id, ...fieldsToUpdate } = input;

    if (Object.keys(fieldsToUpdate).length === 0) {
    }
    const updatedPost = await this.postRepository.update(id, fieldsToUpdate as Partial<Post>); // Cast se necessário

    return updatedPost;
  }
}
