import { Label } from '@/domain/label';

export namespace LabelRepository {
  export const name = 'LabelRepository';

  export namespace List {
    export type Input = {
      filter?: Partial<{
        ids: string[];
        names: string[];
      }>;
      pagination?: {
        page: number;
        limit: number;
      };
    };

    export type Output = {
      labels: Label[];
      total: number;
    };
  }
}

export interface LabelRepository {
  list(input: LabelRepository.List.Input): Promise<LabelRepository.List.Output>;
}
