export const UserRoles = {
  user: 'user',
  admin: 'admin',
  mod: 'mod',
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
};
