import { Module } from '@nestjs/common';
import { SaQuizQuestionsService } from './application/sa-quiz-questions.service';
import { SaQuizQuestionsController } from './api/sa-quiz-questions.controller';
import { UsersRepo } from '../users/infrastructure/users-repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { EncryptConfig } from '../../config/encrypt/encrypt.config';
import { SaCreateQuestionsAndAnswerUseCase } from './application/use-cases/sa-create-questions-and-answer.use-case';
import { QuestionsQuizEntity } from './entities/questions-quiz.entity';
import { ChallengeQuestionsEntity } from '../pair-game-quiz/entities/challenge-questions.entity';
import { ChallengeAnswersEntity } from '../pair-game-quiz/entities/challenge-answers.entity';
import { SaGetQuestionsUseCase } from './application/use-cases/sa-get-questions.use-case';
import { SaUpdateQuestionsAndAnswerUseCase } from './application/use-cases/sa-update-questions-and-answer.use-case';
import { SaDeleteQuestionByIdUseCase } from './application/use-cases/sa-delete-question-by-id.use-case';
import { SaUpdateQuestionsPublishUseCase } from './application/use-cases/sa-update-questions-publish.use-case';
import { GameQuestionsRepo } from '../pair-game-quiz/infrastructure/game-questions.repo';
import { ChallengesQuestionsRepo } from '../pair-game-quiz/infrastructure/challenges-questions.repo';
import { ChallengesAnswersRepo } from '../pair-game-quiz/infrastructure/challenges-answers.repo';
import { PairsGameEntity } from '../pair-game-quiz/entities/pairs-game.entity';
import { GamePairsRepo } from '../pair-game-quiz/infrastructure/game-pairs.repo';
import { SaConfig } from '../../config/sa/sa.config';
import { KeyResolver } from '../../../../../libs/common/src/helpers/key-resolver';
import { UuidErrorResolver } from '../../../../../libs/common/src/helpers/uuid-error-resolver';
import { ParseQueriesService } from '../../../../../libs/common/src/query/parse-queries.service';
import { CalculatorExpirationDate } from '../../../../../libs/common/src/helpers/calculator-expiration-date/calculator-expiration-date';

const saQuizUseCases = [
  SaCreateQuestionsAndAnswerUseCase,
  SaGetQuestionsUseCase,
  SaUpdateQuestionsAndAnswerUseCase,
  SaDeleteQuestionByIdUseCase,
  SaUpdateQuestionsPublishUseCase,
];

const helpers = [KeyResolver, UuidErrorResolver];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      QuestionsQuizEntity,
      PairsGameEntity,
      ChallengeQuestionsEntity,
      ChallengeAnswersEntity,
    ]),
    CqrsModule,
  ],
  controllers: [SaQuizQuestionsController],
  providers: [
    SaConfig,
    ParseQueriesService,
    SaQuizQuestionsService,
    UsersRepo,
    GamePairsRepo,
    GameQuestionsRepo,
    ChallengesAnswersRepo,
    ChallengesQuestionsRepo,
    CalculatorExpirationDate,
    EncryptConfig,
    ...helpers,
    ...saQuizUseCases,
  ],
})
export class SaQuizQuestionsModule {}
