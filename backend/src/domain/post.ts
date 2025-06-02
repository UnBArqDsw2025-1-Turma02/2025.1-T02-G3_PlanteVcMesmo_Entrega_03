import { Label } from './label';

export type Post = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  labels: Label[];
};
