import { Module } from '@nestjs/common';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { MailsModule } from '../mails/mails.module';
import { KeyResolver } from '../common/src/helpers/key-resolver';
import { UuidErrorResolver } from '../common/src/helpers/uuid-error-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../apps/backend/src/features/users/entities/users.entity';
import { InvalidJwtEntity } from '../../apps/backend/src/features/auth/entities/invalid-jwt.entity';
import { SecurityDevicesEntity } from '../../apps/backend/src/features/security-devices/entities/session-devices.entity';
import { PairsGameEntity } from '../../apps/backend/src/features/pair-game-quiz/entities/pairs-game.entity';
import { QuestionsQuizEntity } from '../../apps/backend/src/features/sa-quiz-questions/entities/questions-quiz.entity';
import { ChallengeQuestionsEntity } from '../../apps/backend/src/features/pair-game-quiz/entities/challenge-questions.entity';
import { CaslModule } from '../../apps/backend/src/ability/casl.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MailsConfig } from '../../apps/backend/src/config/mails/mails.config';
import { MailOptionsBuilder } from '../mails/mail-options/mail-options-builder';
import { PostgresConfig } from '../../apps/backend/src/config/db/postgres/postgres.config';
import { UsersService } from '../../apps/backend/src/features/users/application/users.service';
import { DataCleanupService } from '../data-cleanup/data-cleanup.service';
import { UsersRepo } from '../../apps/backend/src/features/users/infrastructure/users-repo';
import { GamePairsRepo } from '../../apps/backend/src/features/pair-game-quiz/infrastructure/game-pairs.repo';
import { InvalidJwtRepo } from '../../apps/backend/src/features/auth/infrastructure/invalid-jwt-repo';
import { GameQuestionsRepo } from '../../apps/backend/src/features/pair-game-quiz/infrastructure/game-questions.repo';
import { SecurityDevicesRepo } from '../../apps/backend/src/features/security-devices/infrastructure/security-devices.repo';
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
    MailsModule,
    CaslModule,
    CqrsModule,
  ],
  controllers: [],
  providers: [
    MailsConfig,
    MailOptionsBuilder,
    PostgresConfig,
    UsersService,
    DataCleanupService,
    ScheduledTasksService,
    UsersRepo,
    GamePairsRepo,
    InvalidJwtRepo,
    GameQuestionsRepo,
    SecurityDevicesRepo,
    ChallengesQuestionsRepo,
    ...helpers,
  ],
})
export class SchedulingModule {}
