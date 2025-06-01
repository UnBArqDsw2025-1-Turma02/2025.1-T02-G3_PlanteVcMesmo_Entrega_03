import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from '@/env';
import express, { Request, Response } from 'express';
import { errorHandler } from '@/api/middlewares';
import { authRoute, postRoute, labelRoute } from '@/api/routes';

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: env.CORS_ORIGIN || '*' }));
app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/label', labelRoute);
app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'API Running' });
});

export default app;
