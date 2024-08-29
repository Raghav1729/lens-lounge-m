import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../../../libs/rabbitmq/src/rabbitmq.service';

@Injectable()
export class FrontendService implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    // Use a public method to set up message consumption
    await this.rabbitMQService.setupMessageConsumption('my_queue', (msg) => {
      if (msg !== null) {
        console.log('Received message:', msg.content.toString());
        this.rabbitMQService.acknowledgeMessage(msg); // Method to acknowledge the message
      }
    });
  }

  async sendMessageToQueue(message: string) {
    await this.rabbitMQService.sendToQueue('my_queue', message);
  }
}
