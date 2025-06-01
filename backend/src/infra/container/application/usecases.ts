import { ServicesDI } from './services';
import { LoginWithGoogleUsecase } from '@/application/usecases/auth';
import { LoginWithGoogleUsecaseZodValidator } from '@/infra/services/shared/zod';
import {
  CreatePostUsecase,
  DeletePostUsecase,
  FindPostUsecase,
  ListPostUsecase,
  UpdatePostUsecase,
} from '@/application/usecases/posts';
import { PlantStrategyUsecase, ChatLLMUsecase } from '@/application/usecases';
import {
  CreatePostUsecaseZodValidator,
  DeletePostUsecaseZodValidator,
  FindPostUsecaseZodValidator,
  ListPostUsecaseZodValidator,
  UpdatePostUsecaseZodValidator,
} from '@/infra/services/shared/zod/posts';
import {
  PlantStrategyUsecaseZodValidator,
  ChatLLMUsecaseZodValidator,
} from '@/infra/services/shared/zod';

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
    .add('ChatLLMUsecase', ({ LLMFactory }) => {
      return new ChatLLMUsecase(new ChatLLMUsecaseZodValidator(), LLMFactory);
    })
    .add(
      'PlantStrategyUsecase',
      ({ SchedulerStrategyExecutor, StrategyFactory }) => {
        return new PlantStrategyUsecase(
          new PlantStrategyUsecaseZodValidator(),
          SchedulerStrategyExecutor,
          StrategyFactory,
        );
      },
    )
    .add('CreatePostUsecase', ({ PostRepository, LabelRepository }) => {
      return new CreatePostUsecase(
        new CreatePostUsecaseZodValidator(),
        PostRepository,
        LabelRepository,
      );
    })
    .add('FindPostUsecase', ({ PostRepository }) => {
      return new FindPostUsecase(
        new FindPostUsecaseZodValidator(),
        PostRepository,
      );
    })
    .add('ListPostUsecase', ({ PostRepository }) => {
      return new ListPostUsecase(
        new ListPostUsecaseZodValidator(),
        PostRepository,
      );
    })
    .add('UpdatePostUsecase', ({ PostRepository }) => {
      return new UpdatePostUsecase(
        new UpdatePostUsecaseZodValidator(),
        PostRepository,
      );
    })
    .add('DeletePostUsecase', ({ PostRepository }) => {
      return new DeletePostUsecase(
        new DeletePostUsecaseZodValidator(),
        PostRepository,
      );
    });
}

export type UseCasesDI = ReturnType<typeof configureUseCases>;
