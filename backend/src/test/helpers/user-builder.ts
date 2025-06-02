import { User } from '@/domain';
import { UserEntity } from '@/infra/orm/entities';
import { dataSource } from '@/infra/orm';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export class UserBuilder {
  private dataSource: DataSource;
  private data: User;

  private constructor() {
    this.dataSource = dataSource;
    this.data = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      pictureUrl: faker.internet.url(),
      encryptedRefreshToken: faker.string.sample(32),
      encryptionIV: faker.string.sample(16),
      role: 'user',
    };
  }

  public static anUser(): UserBuilder {
    return new UserBuilder();
  }

  public customParameters(params: Partial<User>): UserBuilder {
    this.data = {
      ...this.data,
      ...params,
    };

    return this;
  }

  public getData(): User {
    return this.data;
  }

  public async build(): Promise<User> {
    const userRepo = this.dataSource.getRepository(UserEntity);
    const userEntity = userRepo.create(this.data);

    return await userRepo.save(userEntity);
  }
}
