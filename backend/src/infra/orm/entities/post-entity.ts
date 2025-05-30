import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { Label, Post, User } from '@/domain';

export type PostSchema = Post & {
  user: User;
  labels: Label[];
};

export const PostEntity = new EntitySchema<PostSchema>({
  name: 'post',
  columns: {
    ...BaseEntity,
    title: {
      name: 'title',
      type: 'varchar',
      nullable: false,
    },
    description: {
      name: 'description',
      type: 'varchar',
      nullable: false,
    },
    userId: {
      name: 'user_id',
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      inverseSide: 'posts',
      joinColumn: {
        name: 'user_id',
      },
    },
    labels: {
      type: 'many-to-many',
      target: 'label',
      inverseSide: 'posts',
      joinTable: {
        name: 'post_labels',
        joinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'label_id',
          referencedColumnName: 'id',
        },
      },
    },
  },
});
