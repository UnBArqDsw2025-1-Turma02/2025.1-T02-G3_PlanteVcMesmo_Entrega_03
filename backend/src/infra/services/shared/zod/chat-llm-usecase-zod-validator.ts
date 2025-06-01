import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { LLMTypes } from '@/domain';
import { ChatLLMUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ChatLLMUsecaseZodValidator
  implements Validator<ChatLLMUsecase.Input>
{
  private schema = z.object({
    llmType: z.nativeEnum(LLMTypes),
    question: z.string().min(1).max(1000),
  });

  async validate(input: any): Promise<ChatLLMUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
