import { User } from '@/domain';
import { randomUUID } from 'node:crypto';
import { UserEntity } from '@/infra/orm/entities';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '@/application/repositories';

export class UserTypeOrmRepository implements UserRepository {
  private readonly repo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(UserEntity);
  }

  async upsert(
    input: UserRepository.Upsert.Input,
  ): Promise<UserRepository.Upsert.Output> {
    const user = await this.repo.findOne({
      where: { email: input.email },
    });

    const currentDate = new Date();

    if (user) {
      const updatedUser = await this.repo.save({
        ...user,
        updatedAt: currentDate,
        encryptedRefreshToken: input.encryptedRefreshToken,
        encryptionIV: input.encryptionIV,
      });

      return updatedUser;
    }

    const newUser = this.repo.create({
      ...input,
      id: randomUUID(),
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return await this.repo.save(newUser);
  }
}
