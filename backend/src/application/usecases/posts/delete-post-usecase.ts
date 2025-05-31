import { Post } from '@/domain';
import { PostRepository } from '../../../domain/postRepository';
import { Validator } from '../../services/validator.interface';

export namespace DeletePostUsecase {
  export type Input = {
    id: string;
  };

  export type Output = {
    success: boolean;
    message?: string;
  };
}

export class DeletePostUsecase {
  constructor(
    private readonly deletePostInputValidator: Validator<DeletePostUsecase.Input>,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(
    input: DeletePostUsecase.Input,
  ): Promise<DeletePostUsecase.Output> {
    await this.deletePostInputValidator.validate(input);

    const wasDeleted = await this.postRepository.delete({ id: input.id });

    if (!wasDeleted) {
      return {
        success: false,
        message: 'Post não encontrado ou não pôde ser deletado.',
      };
    }

    return {
      success: true,
      message: 'Post deletado com sucesso.',
    };
  }
}
