import env from '@/env';
import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const usecase = container.get('LoginWithGoogleUsecase');

  const { token, refresh } = await usecase.execute({
    code: req.body.code,
  });

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    secure: env.ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 5,
  });

  return res.status(201).json({
    access_token: token,
  });
});

export { router as authRoute };
