import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { Post } from "@/domain";

export const PostEntity = new EntitySchema<Post>({
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
})
