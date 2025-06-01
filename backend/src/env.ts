import { z } from 'zod';
import process from 'node:process';
import logger from '@/infra/logger';

const schema = z.object({
  PORT: z.coerce.number().min(1000),
  DB_PORT: z.coerce.number().min(1000),
  POSTGRES_URL: z.string(),
  ENV: z.enum(['development', 'production', 'test']),
  AES_KEY: z.string().length(64),
  ALGORITHM: z.string().default('aes-256-cbc'),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('60m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
  CHAT_API_KEY: z.string().default(''),
  CHAT_API_URL: z
    .string()
    .url()
    .default('https://api.openai.com/v1/chat/completions'),
  CHAT_MODEL: z.string().default('gpt-4o-mini'),
  GEMINI_API_KEY: z.string().default(''),
  GEMINI_API_URL: z
    .string()
    .url()
    .default(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    ),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  logger.error(parsed.error.format());

  throw new Error('Error on parsing env variables.');
}

const env = parsed.data;

export default env;
