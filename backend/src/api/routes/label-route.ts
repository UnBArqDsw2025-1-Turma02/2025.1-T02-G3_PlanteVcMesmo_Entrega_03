import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';
import { authenticationMiddleware } from '@/api/middlewares';

const router: Router = express.Router();

router.get(
  '/',
  authenticationMiddleware,
  async (req: Request, res: Response) => {
    const usecase = container.get('ListLabelUsecase');

    const output = await usecase.execute({
      pagination: {
        page: req.query.page ? Number(req.query.page) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 10,
      },
      filter: {
        ids: req.query.ids ? (req.query.ids as string).split(',') : [],
        names: req.query.names ? (req.query.names as string).split(',') : [],
      },
    });

    res.status(200).json(output);
  },
);

export { router as labelRoute };
