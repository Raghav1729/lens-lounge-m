import { Module } from '@nestjs/common';
import { PayPalController } from './api/pay-pal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayPalGenerateAccessTokenUseCase } from './application/use-cases/pay-pal-generate-access-token.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { ProcessPayPalWebhookUseCase } from './application/use-cases/process-pay-pal-webhook.use-case';
import { FinalizePayPalPaymentUseCase } from './application/use-cases/finalize-pay-pal-payment.use-case';
import { PayPalCapturePaymentUseCase } from './application/use-cases/pay-pal-capture-payment.use-case';
import { UsersEntity } from '../../../../backend/src/features/users/entities/users.entity';
import { PairsGameEntity } from '../../../../backend/src/features/pair-game-quiz/entities/pairs-game.entity';
import { GuestUsersEntity } from '../../../../backend/src/features/products/entities/unregistered-users.entity';
import { InvalidJwtEntity } from '../../../../backend/src/features/auth/entities/invalid-jwt.entity';
import { QuestionsQuizEntity } from '../../../../backend/src/features/sa-quiz-questions/entities/questions-quiz.entity';
import { ChallengeQuestionsEntity } from '../../../../backend/src/features/pair-game-quiz/entities/challenge-questions.entity';
import { PaymentTransactionsEntity } from '../../../../backend/src/features/products/entities/payment-transaction.entity';
import { OrdersEntity } from '../../../../backend/src/features/products/entities/orders.entity';
import { PayPalAdapter } from './adapter/pay-pal.adapter';
import { PayPalFactory } from '../../config/pay-pal/pay-pal-factory';
import { PayPalConfig } from '../../config/pay-pal/pay-pal.config';
import { PostgresConfig } from '../../../../backend/src/config/db/postgres/postgres.config';
import { NodeEnvConfig } from '../../../../backend/src/config/node-env/node-env.config';
import { PaymentService } from '../../application/payment.service';
import { UsersRepo } from '../../../../backend/src/features/users/infrastructure/users-repo';
import { GamePairsRepo } from '../../../../backend/src/features/pair-game-quiz/infrastructure/game-pairs.repo';
import { InvalidJwtRepo } from '../../../../backend/src/features/auth/infrastructure/invalid-jwt-repo';
import { GuestUsersRepo } from '../../../../backend/src/features/users/infrastructure/guest-users.repo';
import { GameQuestionsRepo } from '../../../../backend/src/features/pair-game-quiz/infrastructure/game-questions.repo';
import { PaymentTransactionsRepo } from '../../infrastructure/payment-transactions.repo';
import { ChallengesQuestionsRepo } from '../../../../backend/src/features/pair-game-quiz/infrastructure/challenges-questions.repo';
import { KeyResolver } from '../../../../../libs/common/src/helpers/key-resolver';
import { UuidErrorResolver } from '../../../../../libs/common/src/helpers/uuid-error-resolver';

const payPalUseCases = [
  PayPalCapturePaymentUseCase,
  PayPalGenerateAccessTokenUseCase,
  ProcessPayPalWebhookUseCase,
  FinalizePayPalPaymentUseCase,
];
const libs = [KeyResolver, UuidErrorResolver];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      PairsGameEntity,
      GuestUsersEntity,
      InvalidJwtEntity,
      QuestionsQuizEntity,
      ChallengeQuestionsEntity,
      PaymentTransactionsEntity,
      OrdersEntity,
    ]),
    CqrsModule,
  ],
  controllers: [PayPalController],
  providers: [
    PayPalAdapter,
    PayPalFactory,
    PayPalConfig,
    PostgresConfig,
    NodeEnvConfig,
    PaymentService,
    UsersRepo,
    GamePairsRepo,
    InvalidJwtRepo,
    GuestUsersRepo,
    GameQuestionsRepo,
    PaymentTransactionsRepo,
    ChallengesQuestionsRepo,
    ...libs,
    ...payPalUseCases,
  ],
})
export class PayPalModule {}
