import { ServicesDI } from './services';
import {
  LoginWithGoogleUsecase,
  AuthenticationUseCase,
  RefreshTokenUsecase,
} from '@/application/usecases/auth';
import { LoginWithGoogleUsecaseZodValidator } from '@/infra/services/shared/zod';

export function configureUseCases(container: ServicesDI) {
  return container
    .add(
      'LoginWithGoogleUsecase',
      ({ EncryptionService, GoogleAuthService, JwtService, UserRepository }) =>
        new LoginWithGoogleUsecase(
          new LoginWithGoogleUsecaseZodValidator(),
          GoogleAuthService,
          UserRepository,
          EncryptionService,
          JwtService,
        ),
    )
    .add(
      'AuthenticationUseCase',
      ({ JwtService }) => new AuthenticationUseCase(JwtService),
    )
    .add(
      'RefreshTokenUsecase',
      ({ JwtService }) => new RefreshTokenUsecase(JwtService),
    );
}

export type UseCasesDI = ReturnType<typeof configureUseCases>;
