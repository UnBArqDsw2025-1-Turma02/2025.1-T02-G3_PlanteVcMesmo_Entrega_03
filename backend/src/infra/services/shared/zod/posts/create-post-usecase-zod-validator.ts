import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { CreatePostUsecase } from '@/application/usecases/posts';
import { z } from 'zod';

export class CreatePostUsecaseZodValidator
  implements Validator<CreatePostUsecase.Input>
{
  private schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    userId: z.string().uuid(),
    labels: z.array(z.string()),
  });

  async validate(input: any): Promise<CreatePostUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
