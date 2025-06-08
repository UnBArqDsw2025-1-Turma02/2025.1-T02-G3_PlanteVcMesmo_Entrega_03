import { CalendarPlant } from '@/domain/plant';

export namespace PlantRepository {
  export const name = 'PlantRepository';

  export namespace List {
    export type Input = {
      filter?: Partial<{
        ids: string[];
        names: string[];
        state: string;
      }>;
      pagination?: {
        page: number;
        limit: number;
      };
    };

    export type Output = {
      plants: CalendarPlant[];
      total: number;
    };
  }
}

export interface PlantRepository {
  list(input: PlantRepository.List.Input): Promise<PlantRepository.List.Output>;
}