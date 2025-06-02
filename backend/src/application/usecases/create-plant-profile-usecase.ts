import { CalendarPlant } from '@/domain';

export class CreatePlantProfileUseCase {
  constructor() {}

  public async execute(
    input: CreatePlantProfileUseCase.Input,
  ): CreatePlantProfileUseCase.Output {
    throw new Error('Not implemented');
  }
}

export namespace CreatePlantProfileUseCase {
  export type Input = CalendarPlant;
  export type Output = Promise<void>;
}
