import { StrategyType, StrategyTypes } from '@/domain';
import { SchedulerStrategy } from '@/application/services';
import { container } from '@/infra/container';

export class StrategyFactory {
  constructor() {}

  public getModuleInstance(item: StrategyType): SchedulerStrategy {
    const itemsMap: Record<StrategyType, SchedulerStrategy> = {
      [StrategyTypes.AUTOMATIC]: container.get('AutomaticSchedulerStrategy'),
      [StrategyTypes.MANUAL]: container.get('ManualSchedulerStrategy'),
    };

    if (!itemsMap[item]) {
      throw new Error('Invalid Type');
    }

    return itemsMap[item];
  }
}
