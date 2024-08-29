import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MailsModule } from './mails/mails.module';
import { DataCleanupModule } from './data-cleanup/data-cleanup.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { CommonModule } from './common/src/common.module';

@Module({
  imports: [
    CommonModule,
    RabbitMQModule,
    MailsModule,
    DataCleanupModule,
    SchedulingModule,
  ],
  exports: [
    RabbitMQModule,
    MailsModule,
    DataCleanupModule,
    SchedulingModule,
    CommonModule,
  ],
})
export class LibsModule {}
