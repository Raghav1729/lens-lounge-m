import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KeyResolver } from '../helpers/key-resolver';
import { UuidErrorResolver } from '../helpers/uuid-error-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../../backend/src/features/users/entities/users.entity';
import { InvalidJwtEntity } from '../../../backend/src/features/auth/entities/invalid-jwt.entity';
import { SecurityDevicesEntity } from '../../../backend/src/features/security-devices/entities/session-devices.entity';
import { QuestionsQuizEntity } from '../../../backend/src/features/sa-quiz-questions/entities/questions-quiz.entity';
import { ChallengeQuestionsEntity } from '../../../backend/src/features/pair-game-quiz/entities/challenge-questions.entity';
import { PairsGameEntity } from '../../../backend/src/features/pair-game-quiz/entities/pairs-game.entity';
import { DataCleanupService } from './data-cleanup.service';
import { UsersRepo } from '../../../backend/src/features/users/infrastructure/users-repo';
import { InvalidJwtRepo } from '../../../backend/src/features/auth/infrastructure/invalid-jwt-repo';
import { GamePairsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/game-pairs.repo';
import { SecurityDevicesRepo } from '../../../backend/src/features/security-devices/infrastructure/security-devices.repo';
import { GameQuestionsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/game-questions.repo';
import { ChallengesQuestionsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/challenges-questions.repo';

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
