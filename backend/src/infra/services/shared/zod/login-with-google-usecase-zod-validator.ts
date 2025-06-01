import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { LoginWithGoogleUsecase } from '@/application/usecases/auth';
import { z } from 'zod';

export class LoginWithGoogleUsecaseZodValidator
  implements Validator<LoginWithGoogleUsecase.Input>
{
  private schema = z.object({
    code: z.string().min(1, 'Code is required'),
  });

  async validate(input: any): Promise<LoginWithGoogleUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
