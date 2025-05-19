import { EntitySchema } from 'typeorm';
import { BaseEntity } from '@/infra/orm/entities';

export const LabelEntity = new EntitySchema({
  name: 'label',
  columns: {
    ...BaseEntity,
    name: {
      name: 'name',
      type: 'varchar',
      nullable: false,
    },
    code: {
      name: 'code',
      type: 'varchar',
      nullable: false,
    },
  },
})
