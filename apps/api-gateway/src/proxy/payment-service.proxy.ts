import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class PaymentServiceProxy implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'payment-service', // Name of the service in Docker Compose
        port: 3002, // Port that payment-service is exposed on
      },
    });
  }

  getClient() {
    return this.client;
  }
}
