import { Post } from '@/domain';

export const UserRoles = {
  USER: 'user',
  ADMIN: 'admin',
  MOD: 'mod',
};

export type UserRole = keyof typeof UserRoles;

export type User = {
  id: String,
  createdAt: Date,
  updatedAt: Date,
  email: String,
  name: String,
  pictureUrl: String,
  encryptedRefreshToken: String,
  encryptionIV: String,
  role: UserRole,
  posts: Array<Post>,
};
