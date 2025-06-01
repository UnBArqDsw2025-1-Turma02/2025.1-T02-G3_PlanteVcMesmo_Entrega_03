import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { ListPostUsecase } from '@/application/usecases/posts';
import { z } from 'zod';

export class ListPostUsecaseZodValidator
  implements Validator<ListPostUsecase.Input>
{
  private schema = z.object({
    filters: z.object({
      userId: z.string().uuid().optional(),
    }),
    pagination: z.object({
      page: z.number().int().min(1),
      limit: z.number().int().min(1).max(100),
    }),
  });

  async validate(input: any): Promise<ListPostUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
