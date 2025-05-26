import { User } from '@/domain';
import { Label } from '@/domain';

export type Post = {
  id: string;
  user: User;
  title: string;
  description: string;
  labels: Label[];
  createdAt: Date;
  updatedAt: Date;
};
