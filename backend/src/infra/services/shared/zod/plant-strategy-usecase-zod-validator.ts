import { ValidationError } from '@/application/errors';
import { Validator } from '@/application/services';
import { StrategyTypes, CalendarPeriods } from '@/domain';
import { PlantStrategyUsecase } from '@/application/usecases';
import { z } from 'zod';

export class PlantStrategyUsecaseZodValidator
  implements Validator<PlantStrategyUsecase.Input>
{
  private schema = z.object({
    strategyType: z.nativeEnum(StrategyTypes),
    plant: z.object({
      plantName: z.string().min(1),
      speciesName: z.string().min(1),
      isOutdoor: z.boolean(),
      isIlluminated: z.boolean(),
      state: z.string().min(1),
      period: z.nativeEnum(CalendarPeriods).optional(),
      timesPerPeriod: z.number().int().optional(),
    }),
  });

  async validate(input: any): Promise<PlantStrategyUsecase.Input> {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return result.data;
  }
}
