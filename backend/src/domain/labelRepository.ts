import { Label } from './label';

export namespace LabelRepository {
  export const name = 'LabelRepository';

  export namespace Create {
    export type Input = Omit<Label, 'id' | 'createdAt' | 'updatedAt'>;
    export type Output = Label;
  }

  export namespace FindBy {
    export type Input = {
      id?: string;
      name?: string;
    };
    export type Output = Label | null;
  }

  export namespace List {
    export type Input = {
      filters?: {
      };
      pagination: {
        page: number;
        limit: number;
      };
    };
    export type Output = {
      labels: Label[];
      total: number;
    };
  }

  export namespace Update {
    export type Input = Partial<Omit<Label, 'id' | 'createdAt' | 'updatedAt'>>;
    export type Output = Label | null;
  }

  export namespace Delete {
    export type Input = {
      id: string;
    };
    export type Output = boolean;
  }
}

export interface LabelRepository {
  create(input: LabelRepository.Create.Input): Promise<LabelRepository.Create.Output>;

  findBy(input: LabelRepository.FindBy.Input): Promise<LabelRepository.FindBy.Output>;

  list(input: LabelRepository.List.Input): Promise<LabelRepository.List.Output>;

  update(
    id: string, 
    data: LabelRepository.Update.Input
  ): Promise<LabelRepository.Update.Output>;

  delete(input: LabelRepository.Delete.Input): Promise<LabelRepository.Delete.Output>;
}