import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { CalendarPlant } from '@/domain';

export enum PlantState {
  HEALTHY = 'healthy',
  SICK = 'sick',
  DEAD = 'dead',
}

export const PlantEntity = new EntitySchema<CalendarPlant>({
  name: 'plant',
  columns: {
    ...BaseEntity,
    plantName: {
      type: 'varchar',
      name: 'plant_name',
      nullable: false,
    },
    speciesName: {
      type: 'varchar',
      name: 'species_name',
      nullable: false,
    },
    isOutdoor: {
      type: 'boolean',
      name: 'is_outdoor',
      nullable: false,
      default: false,
    },
    isIlluminated: {
      type: 'boolean',
      name: 'is_illuminated',
      nullable: false,
      default: false,
    },
    state: {
      type: 'enum',
      name: 'state',
      enum: PlantState,
      default: PlantState.HEALTHY,
    },
    period: {
      type: 'varchar',
      name: 'period',
      nullable: true,
    },
    timesPerPeriod: {
      type: 'int',
      name: 'times_per_period',
      nullable: true,
    },
  },
});