import { User } from '@/domain';

export namespace UserRepository {
  export const name = 'UserRepository';

  export namespace Upsert {
    export type Input = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

    export type Output = User;
  }
}

export interface UserRepository {
  upsert(
    input: UserRepository.Upsert.Input,
  ): Promise<UserRepository.Upsert.Output>;
}
