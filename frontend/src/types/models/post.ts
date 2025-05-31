import type { Label } from '@/types/models/label';

export type Post = {
  title: string;
  description: string;
  labels?: Label[];
};
