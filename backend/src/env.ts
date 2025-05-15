import { z } from "zod";
import process from "node:process";
import logger from "@/infra/logger";

const schema = z.object({
  PORT: z.coerce.number().min(1000),
  DB_PORT: z.coerce.number().min(1000),
  POSTGRES_URL: z.string(),
  ENV: z.enum(['development','production','test']),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  logger.info(process.env)
  logger.error(parsed.error.format())

  throw new Error('Error on parsing env variables.')
}

const env = parsed.data;

export default env;