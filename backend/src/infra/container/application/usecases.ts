import { ServicesDI } from './services';
import { LoginWithGoogleUsecase } from '@/application/usecases/auth';
import { LoginWithGoogleUsecaseZodValidator } from '@/infra/services/shared/zod';

export function configureUseCases(container: ServicesDI) {
  return container.add(
    'LoginWithGoogleUsecase',
    ({ EncryptionService, GoogleAuthService, JwtService, UserRepository }) =>
      new LoginWithGoogleUsecase(
        new LoginWithGoogleUsecaseZodValidator(),
        GoogleAuthService,
        UserRepository,
        EncryptionService,
        JwtService,
      ),
  );
}

export type UseCasesDI = ReturnType<typeof configureUseCases>;
