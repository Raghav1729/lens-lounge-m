import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KeyResolver } from '../common/src/helpers/key-resolver';
import { UuidErrorResolver } from '../common/src/helpers/uuid-error-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../apps/backend/src/features/users/entities/users.entity';
import { InvalidJwtEntity } from '../../apps/backend/src/features/auth/entities/invalid-jwt.entity';
import { SecurityDevicesEntity } from '../../apps/backend/src/features/security-devices/entities/session-devices.entity';
import { QuestionsQuizEntity } from '../../apps/backend/src/features/sa-quiz-questions/entities/questions-quiz.entity';
import { ChallengeQuestionsEntity } from '../../apps/backend/src/features/pair-game-quiz/entities/challenge-questions.entity';
import { PairsGameEntity } from '../../apps/backend/src/features/pair-game-quiz/entities/pairs-game.entity';
import { DataCleanupService } from './data-cleanup.service';
import { UsersRepo } from '../../apps/backend/src/features/users/infrastructure/users-repo';
import { InvalidJwtRepo } from '../../apps/backend/src/features/auth/infrastructure/invalid-jwt-repo';
import { GamePairsRepo } from '../../apps/backend/src/features/pair-game-quiz/infrastructure/game-pairs.repo';
import { SecurityDevicesRepo } from '../../apps/backend/src/features/security-devices/infrastructure/security-devices.repo';
import { GameQuestionsRepo } from '../../apps/backend/src/features/pair-game-quiz/infrastructure/game-questions.repo';
import { ChallengesQuestionsRepo } from '../../apps/backend/src/features/pair-game-quiz/infrastructure/challenges-questions.repo';

const helpers = [KeyResolver, UuidErrorResolver];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      InvalidJwtEntity,
      SecurityDevicesEntity,
      PairsGameEntity,
      QuestionsQuizEntity,
      ChallengeQuestionsEntity,
    ]),
    CqrsModule,
  ],
  providers: [
    DataCleanupService,
    UsersRepo,
    InvalidJwtRepo,
    SecurityDevicesRepo,
    GamePairsRepo,
    GameQuestionsRepo,
    ChallengesQuestionsRepo,
    ...helpers,
  ],
})
export class DataCleanupModule {}
