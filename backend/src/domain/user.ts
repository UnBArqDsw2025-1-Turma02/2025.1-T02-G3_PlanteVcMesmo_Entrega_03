import { Post } from '@/domain';

export const UserRoles = {
  USER: 'user',
  ADMIN: 'admin',
  MOD: 'mod',
};

export type UserRole = keyof typeof UserRoles;

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  pictureUrl: string;
  encryptedRefreshToken: string;
  encryptionIV: string;
  role: UserRole;
  posts: Array<Post>;
};
