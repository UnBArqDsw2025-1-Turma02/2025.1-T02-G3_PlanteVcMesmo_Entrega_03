import { Post } from '@/domain';

export type Label = {
  id: String;
  name: String;
  color: String;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}