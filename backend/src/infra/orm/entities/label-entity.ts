import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';
import { Label } from '@/domain';

export const LabelEntity = new EntitySchema<Label>({
  name: 'label',
  columns: {
    ...BaseEntity,
    name: {
      name: 'name',
      type: 'varchar',
      nullable: false,
    },
    color: {
      name: 'code',
      type: 'varchar',
      nullable: false,
    },
  },
  relations: {
    posts: {
      type: 'many-to-many',
      target: 'post',
      inverseSide: 'labels'
    },
  },
})
