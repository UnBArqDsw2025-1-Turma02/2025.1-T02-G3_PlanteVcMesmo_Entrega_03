import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';
import { authenticationMiddleware } from '@/api/middlewares';

const router: Router = express.Router();

router.get(
  '/',
  authenticationMiddleware,
  async (req: Request, res: Response) => {
    const usecase = container.get('ChatLLMUsecase');
    const output = await usecase.execute(req.body);

    res.status(200).json(output);
  },
);

export { router as chatRoute };
