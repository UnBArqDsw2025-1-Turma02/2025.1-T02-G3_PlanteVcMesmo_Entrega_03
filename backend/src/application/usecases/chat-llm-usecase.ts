import { LLMType } from '@/domain';
import { LLMFactory } from '@/infra/factory';
import { Validator } from '@/application/services';

export class ChatLLMUsecase {
  constructor(
    private readonly chatLLMInputValidator: Validator<ChatLLMUsecase.Input>,
    private readonly llmFactory: LLMFactory,
  ) {}

  public async execute(
    input: ChatLLMUsecase.Input,
  ): Promise<ChatLLMUsecase.Output> {
    const validatedInput = await this.chatLLMInputValidator.validate(input);
    const llmProvider = this.llmFactory.getModuleInstance(
      validatedInput.llmType,
    );
    return await llmProvider.chat({ question: validatedInput.question });
  }
}

export namespace ChatLLMUsecase {
  export type Input = {
    llmType: LLMType;
    question: string;
  };

  export type Output = {
    answer: string;
  };
}
