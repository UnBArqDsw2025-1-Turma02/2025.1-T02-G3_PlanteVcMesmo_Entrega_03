import { EntitySchemaColumnOptions } from "typeorm";

export const BaseEntity = {
  id: {
    type: 'uuid',
    name: 'id',
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: 'timestamp',
    name: 'created_at',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    type: 'timestamp',
    name: 'updated_at',
    updateDate: true,
  } as EntitySchemaColumnOptions,
};
