import env from '@/env';
import express, { Request, Response, Router } from 'express';
import { container } from '@/infra/container';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const usecase = container.get('LoginWithGoogleUsecase');

  const { token, refresh } = await usecase.execute({
    code: req.body.code,
  });

  req.cookies.set('refresh_token', refresh, {
    httpOnly: true,
    secure: env.ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 5,
  });

  return res.send(200).json(token);
});

export { router as authRoute };
