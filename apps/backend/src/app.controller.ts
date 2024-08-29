import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { RabbitMQService } from '../../../libs/rabbitmq/src/rabbitmq.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('send-message')
  async sendMessage(
    @Body() message: { queue: string; content: string },
  ): Promise<void> {
    await this.rabbitMQService.sendToQueue(message.queue, message.content);
  }

  @Get('/healthz')
  getHealthz() {
    return { status: 'ok' };
  }

  @Get('/ready')
  getReady() {
    return { status: 'ready' };
  }
}
