import express, { Request, Response } from 'express';
import { errorHandler } from '@/api/middlewares';
import { authRoute, postRoute } from '@/api/routes';

const app = express();
app.use(express.json());
app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'API Running' });
});

export default app;
