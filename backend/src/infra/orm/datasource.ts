import { DataSource } from 'typeorm';
import env from '@/env';
import logger from '@/infra/logger';
import {
  UserEntity,
  PostEntity,
  CommentEntity,
  LabelEntity,
} from '@/infra/orm/entities';
import {
  AddColor,
  InitDb,
  AddPostLabelRelations,
} from '@/infra/orm/migrations';

const defaultConfig = {
  migrationsRun: true,
  entities: [UserEntity, PostEntity, CommentEntity, LabelEntity],
  migrations: [InitDb, AddPostLabelRelations, AddColor],
};

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: env.DB_PORT,
  url: env.POSTGRES_URL,
  ...defaultConfig,
});

export async function dbConnection() {
  try {
    await dataSource.initialize();
    logger.info('✅ Database connected');
  } catch (error) {
    logger.error('Error on connecting to database', error);
    throw new Error('Error on connecting to database');
  }
}
