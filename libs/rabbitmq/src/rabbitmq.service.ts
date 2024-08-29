import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import * as amqpLib from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private connection: amqp.AmqpConnectionManager;
  private channelWrapper: amqp.ChannelWrapper;

  constructor() {
    // Connect to RabbitMQ server
    this.connection = amqp.connect(['amqp://localhost']);

    // Create a channel wrapper with setup configuration
    this.channelWrapper = this.connection.createChannel({
      setup: async (channel: amqpLib.Channel) => {
        // Setup exchanges, queues, and bindings
        await Promise.all([
          channel.assertExchange('my_exchange', 'direct', { durable: true }),
          channel.assertQueue('my_queue', { durable: true }),
          channel.bindQueue('my_queue', 'my_exchange', 'routing_key'),
        ]);
      },
    });
  }

  /**
   * Send a message to a specified queue.
   * @param queue The name of the queue to send the message to.
   * @param message The message to send.
   */
  async sendToQueue(queue: string, message: string): Promise<void> {
    // Send the message to the specified queue
    await this.channelWrapper.sendToQueue(queue, Buffer.from(message));
  }

  /**
   * Setup message consumption on a specified queue.
   * @param queue The name of the queue to consume messages from.
   * @param onMessage The callback to execute when a message is received.
   */
  async setupMessageConsumption(
    queue: string,
    onMessage: (msg: amqpLib.Message | null) => void,
  ): Promise<void> {
    await this.channelWrapper.addSetup((channel: amqpLib.Channel) => {
      channel.consume(queue, (msg: amqpLib.Message | null) => {
        onMessage(msg);
      });
    });
  }

  /**
   * Acknowledge a message.
   * @param msg The message to acknowledge.
   */
  acknowledgeMessage(msg: amqpLib.Message) {
    if (msg !== null) {
      this.channelWrapper.ack(msg);
    }
  }

  /**
   * Clean up resources when the module is destroyed.
   */
  async onModuleDestroy() {
    // Close the channel and connection
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
