import { Post } from '@/domain';

export type Label = {
  id: string;
  name: string;
  color: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
};
