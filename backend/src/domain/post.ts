import { User } from "@/domain";

export type Post = {
  id: String,
  createdAt: Date,
  updatedAt: Date,
  title: String,
  description: String,
  user: User,
};
