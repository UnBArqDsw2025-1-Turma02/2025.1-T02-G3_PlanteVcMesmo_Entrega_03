import env from '@/env';
import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';
import { authenticationMiddleware } from '@/api/middlewares';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
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

  res.status(201).json({
    access_token: token,
  });
});

router.get(
  '/me',
  authenticationMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    res.status(200).json(user);
  },
);

router.post('/refresh', async (req: Request, res: Response) => {
  if (!req.cookies.refresh_token) {
    res.status(401).json({ message: 'No refresh token provided' });
  }
  const usecase = container.get('RefreshTokenUsecase');

  const { token } = await usecase.execute({
    refreshToken: req.cookies.refresh_token,
  });

  res.status(200).json({
    access_token: token,
  });
});

router.get('/logout', async (req: Request, res: Response) => {
  res.clearCookie('refresh_token');
  res.status(204).send();
});

export { router as authRoute };
