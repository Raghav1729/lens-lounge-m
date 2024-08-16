import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './api/users.controller';
import { AuthService } from '../auth/application/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CaslModule } from '../../ability/casl.module';
import { JwtConfig } from '../../config/jwt/jwt.config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { RemoveUserByIdUseCase } from './application/use-cases/remove-user-byId.use-case';
import { EncryptConfig } from '../../config/encrypt/encrypt.config';
import { UsersRepo } from './infrastructure/users-repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { FindUsersUseCase } from './application/use-cases/find-users.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { GamePairsRepo } from '../pair-game-quiz/infrastructure/game-pairs.repo';
import { PairsGameEntity } from '../pair-game-quiz/entities/pairs-game.entity';
import { ChallengesQuestionsRepo } from '../pair-game-quiz/infrastructure/challenges-questions.repo';
import { ChallengeQuestionsEntity } from '../pair-game-quiz/entities/challenge-questions.entity';
import { GameQuestionsRepo } from '../pair-game-quiz/infrastructure/game-questions.repo';
import { QuestionsQuizEntity } from '../sa-quiz-questions/entities/questions-quiz.entity';
import { SaConfig } from '../../config/sa/sa.config';
import { LoginEmailExistsValidator } from '../../../../libs/common/validators/login-email-exists.validator';
import { EmailAndLoginNotExistValidator } from '../../../../libs/common/validators/email-and-login-not-exist.validator';
import { CodeExistsValidator } from '../../../../libs/common/validators/code-exists.validator';
import { KeyResolver } from '../../../../libs/common/helpers/key-resolver';
import { UuidErrorResolver } from '../../../../libs/common/helpers/uuid-error-resolver';
import { ParseQueriesService } from '../../../../libs/common/query/parse-queries.service';
import { CalculatorExpirationDate } from '../../../../libs/common/helpers/calculator-expiration-date/calculator-expiration-date';

const usersUseCases = [
  CreateUserUseCase,
  UpdateUserUseCase,
  RemoveUserByIdUseCase,
  FindUsersUseCase,
  FindUserByIdUseCase,
];

const usersValidators = [
  LoginEmailExistsValidator,
  EmailAndLoginNotExistValidator,
  CodeExistsValidator,
];

const helpers = [KeyResolver, UuidErrorResolver];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      PairsGameEntity,
      QuestionsQuizEntity,
      ChallengeQuestionsEntity,
    ]),
    CaslModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    SaConfig,
    JwtConfig,
    EncryptConfig,
    ParseQueriesService,
    UsersService,
    UsersRepo,
    AuthService,
    JwtService,
    GamePairsRepo,
    GameQuestionsRepo,
    ChallengesQuestionsRepo,
    CalculatorExpirationDate,
    ...helpers,
    ...usersValidators,
    ...usersUseCases,
  ],
  exports: [UsersService],
})
export class UsersModule {}
