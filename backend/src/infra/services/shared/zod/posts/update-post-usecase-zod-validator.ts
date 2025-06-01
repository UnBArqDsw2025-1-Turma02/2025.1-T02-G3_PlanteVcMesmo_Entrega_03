import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { UpdatePostUsecase } from '@/application/usecases/posts';
import { z } from 'zod';

export class UpdatePostUsecaseZodValidator
  implements Validator<UpdatePostUsecase.Input>
{
  private schema = z.object({
    id: z.string().uuid(),
    fields: z.object({
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
    }),
  });

  async validate(input: any): Promise<UpdatePostUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
