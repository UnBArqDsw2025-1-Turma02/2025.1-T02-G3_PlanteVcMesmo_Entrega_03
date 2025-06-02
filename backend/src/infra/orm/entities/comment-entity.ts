import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { Comment, Post, User } from '@/domain'; 

export type CommentSchema = Comment & {
  user: User; 
  post: Post; 
};

export const CommentEntity = new EntitySchema<CommentSchema>({
  name: 'comment',
  columns: {
    ...BaseEntity,
    content: {
      name: 'description',
      type: 'varchar',
      nullable: false,
    },
    userId: {
      name: 'user_id',
      type: 'uuid',
      nullable: false,
    },
    postId: {
      name: 'post_id',
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      inverseSide: 'comments',
      joinColumn: {
        name: 'user_id',
      },
    },
    post: {
      type: 'many-to-one',
      target: 'post',
      inverseSide: 'comments',
      joinColumn: {
        name: 'post_id',
      },
    },
  },
});