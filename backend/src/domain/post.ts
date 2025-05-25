import { User } from "@/domain";
import { Label } from "@/domain";

export type Post = {
  id: String,
  user: User,
  title: String,
  description: String,
  labels: Label[],
  createdAt: Date,
  updatedAt: Date,
};
