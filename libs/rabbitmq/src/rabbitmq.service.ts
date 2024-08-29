import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import * as amqpLib from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private connection: amqp.AmqpConnectionManager;
  private channelWrapper: amqp.ChannelWrapper;

  constructor() {
    this.connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = this.connection.createChannel({
      setup: async (channel: amqpLib.Channel) => {
        await Promise.all([
          channel.assertExchange('my_exchange', 'direct', { durable: true }),
          channel.assertQueue('my_queue', { durable: true }),
          channel.bindQueue('my_queue', 'my_exchange', 'routing_key'),
        ]);
      },
    });
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    await this.channelWrapper.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });
  }

  async setupMessageConsumption(
    queue: string,
    onMessage: (msg: amqpLib.ConsumeMessage | null) => void,
  ): Promise<void> {
    await this.channelWrapper.addSetup((channel: amqpLib.Channel) => {
      return channel.consume(queue, (msg: amqpLib.ConsumeMessage | null) => {
        if (msg) {
          onMessage(msg);
        }
      });
    });
  }

  acknowledgeMessage(msg: amqpLib.Message) {
    if (msg !== null) {
      this.channelWrapper.ack(msg);
    }
  }

  async onModuleDestroy() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
