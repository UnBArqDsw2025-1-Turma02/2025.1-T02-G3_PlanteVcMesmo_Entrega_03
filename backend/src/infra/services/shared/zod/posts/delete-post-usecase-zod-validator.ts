import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { DeletePostUsecase } from '@/application/usecases/posts';
import { z } from 'zod';

export class DeletePostUsecaseZodValidator
  implements Validator<DeletePostUsecase.Input>
{
  private schema = z.object({
    postId: z.string().uuid(),
  });

  async validate(input: any): Promise<DeletePostUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
