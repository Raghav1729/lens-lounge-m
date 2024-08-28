import { Module } from '@nestjs/common';
import { RabbitMQService } from './src/rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
