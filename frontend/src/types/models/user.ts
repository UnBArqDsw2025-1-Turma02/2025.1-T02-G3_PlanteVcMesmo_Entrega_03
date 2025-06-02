export const UserRoles = {
  user: 'user',
  admin: 'admin',
  mod: 'mod',
};

export type UserRole = keyof typeof UserRoles;

export type User = {
  userId: string;
  email: string;
  name: string;
  pictureUrl: string;
  role: UserRole;
};
