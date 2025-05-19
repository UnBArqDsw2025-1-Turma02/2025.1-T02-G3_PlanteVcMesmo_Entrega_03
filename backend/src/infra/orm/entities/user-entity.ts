import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { User } from "@/domain";

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MOD = 'mod',
};

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    ...BaseEntity,
    email: {
      type: 'varchar',
      name: 'email',
      nullable: false,
      unique: true,
    },
    name: {
      type: 'varchar',
      name: 'name',
      nullable: false,
    },
    pictureUrl: {
      type: 'varchar',
      name: 'picture_url',
      nullable: true,
    },
    encryptedRefreshToken: {
      type: 'varchar',
      name: 'encrypted_refresh_token',
      nullable: true,
    },
    encryptionIV: {
      type: 'varchar',
      name: 'encryption_iv',
      nullable: true,
    },
    role: {
      type: 'enum',
      name: 'role',
      enum: UserRole,
      default: UserRole.USER,
    }
  },
})
