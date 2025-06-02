import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from '@/api/middlewares';

const router: Router = express.Router();

router.post(
  '/',
  authenticationMiddleware,
  authorizationMiddleware(['admin']),
  async (req: Request, res: Response) => {
    const usecase = container.get('CreatePostUsecase');

    const output = await usecase.execute({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(output);
  },
);

router.get('/', async (req: Request, res: Response) => {
  const usecase = container.get('ListPostUsecase');

  const output = await usecase.execute({
    pagination: {
      page: req.query.page ? Number(req.query.page) : 0,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    },
    filters: {},
  });

  res.status(200).json(output);
});

router.get('/:postId', async (req: Request, res: Response) => {
  const usecase = container.get('FindPostUsecase');

  const output = await usecase.execute({
    postId: req.params.postId,
  });

  res.status(200).json(output);
});

router.delete(
  '/:postId',
  authenticationMiddleware,
  authorizationMiddleware(['admin']),
  async (req: Request, res: Response) => {
    const usecase = container.get('DeletePostUsecase');

    const output = await usecase.execute({
      postId: req.params.postId,
    });

    res.status(204).json(output);
  },
);

router.put(
  '/:postId',
  authenticationMiddleware,
  authorizationMiddleware(['admin']),
  async (req: Request, res: Response) => {
    const usecase = container.get('UpdatePostUsecase');

    const output = await usecase.execute({
      postId: req.params.postId,
      fields: req.body,
    });

    res.status(200).json(output);
  },
);

export { router as postRoute };
