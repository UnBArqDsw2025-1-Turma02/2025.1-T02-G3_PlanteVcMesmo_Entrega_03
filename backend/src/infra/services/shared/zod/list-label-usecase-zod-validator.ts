import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { ListLabelUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ListLabelUsecaseZodValidator
  implements Validator<ListLabelUsecase.Input>
{
  private schema = z.object({
    filter: z
      .object({
        ids: z.array(z.string().uuid()).optional(),
        names: z.array(z.string()).optional(),
      })
      .optional(),
    pagination: z
      .object({
        page: z.number().int().min(0),
        limit: z.number().int().min(1).max(100),
      })
      .optional(),
  });

  async validate(input: any): Promise<ListLabelUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
