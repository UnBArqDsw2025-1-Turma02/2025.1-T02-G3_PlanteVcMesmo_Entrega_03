import type { Label } from '@/types/models/label';

export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  labels?: Label[];
};
