import express, { Request, Response } from 'express';
import { authRoute } from './routes';


const app = express();
app.use(express.json());
app.use('/auth', authRoute);

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'API Running' });
});

export default app;
