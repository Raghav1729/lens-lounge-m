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
    // const host = process.env.PAYMENT_SERVICE_HOST || 'localhost';
    // const port = Number(process.env.PAYMENT_SERVICE_PORT) || 3002;

    const host: string = 'localhost';
    const port: number = 3002;

    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    });
  }

  getClient() {
    return this.client;
  }
}
