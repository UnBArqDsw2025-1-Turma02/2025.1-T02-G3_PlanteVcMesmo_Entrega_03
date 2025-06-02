import env from '@/env';
import app from '@/api';
import logger from '@/infra/logger';
import { dbConnection } from '@/infra/orm/datasource';

const port = env.PORT;

async function server() {
  try {
    logger.info('⏳ Initializing database...');
    await dbConnection();
    app.listen(port);
  } catch (error) {
    logger.error('Error on starting server', error);
  }
}

server()
  .then(() => {
    logger.info(`🚀 Server is running on http://localhost:${port}`);
  })
  .catch((error) => {
    logger.error('Error on starting server', error);
  });
