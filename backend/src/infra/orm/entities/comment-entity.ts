import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';

export const CommentEntity = new EntitySchema({
  name: 'comment',
  columns: {
    ...BaseEntity,
    content: {
      name: 'description',
      type: 'varchar',
      nullable: false,
    },
  },
});
