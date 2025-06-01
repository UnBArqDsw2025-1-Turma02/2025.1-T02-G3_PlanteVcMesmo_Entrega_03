import { CalendarPlant, StrategyType } from '@/domain';
import { SchedulerStrategyExecutor, Validator } from '@/application/services';
import { StrategyFactory } from '@/infra/factory';

export class PlantStrategyUsecase {
  constructor(
    private readonly plantStrategyInputValidator: Validator<PlantStrategyUsecase.Input>,
    private readonly schedulerStrategyExecutor: SchedulerStrategyExecutor,
    private readonly strategyFactory: StrategyFactory,
  ) {}
  public async execute(
    input: PlantStrategyUsecase.Input,
  ): Promise<PlantStrategyUsecase.Output> {
    const validatedInput =
      await this.plantStrategyInputValidator.validate(input);

    const strategy = this.strategyFactory.getModuleInstance(
      validatedInput.strategyType,
    );

    this.schedulerStrategyExecutor.setStrategy(strategy);
    const result = await this.schedulerStrategyExecutor.execute(
      validatedInput.plant,
    );

    return {
      period: result.period,
      timesPerPeriod: result.timesPerPeriod,
    };
  }
}

export namespace PlantStrategyUsecase {
  export type Input = {
    strategyType: StrategyType;
    plant: CalendarPlant;
  };

  export type Output = {
    period: string;
    timesPerPeriod: number;
  };
}
