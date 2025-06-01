import { Validator } from '@/application/services';
import { LabelRepository } from '@/application/repositories';

export class ListLabelUsecase {
  constructor(
    private readonly chatLLMInputValidator: Validator<ListLabelUsecase.Input>,
    private readonly labelRepository: LabelRepository,
  ) {}

  public async execute(
    input: ListLabelUsecase.Input,
  ): Promise<ListLabelUsecase.Output> {
    const validatedInput = await this.chatLLMInputValidator.validate(input);
    const labels = await this.labelRepository.list(validatedInput);
    return labels;
  }
}

export namespace ListLabelUsecase {
  export type Input = LabelRepository.List.Input;
  export type Output = LabelRepository.List.Output;
}
