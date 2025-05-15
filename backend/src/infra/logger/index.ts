import pino from 'pino';

const logger = pino({
  name: 'plante-vc-mesmo',
  transport: { target: 'pino-pretty' }
});

export default logger;