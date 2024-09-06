import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class FrontendProxy implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.FRONTEND_SERVICE_HOST || 'localhost',
        port: Number(process.env.FRONTEND_SERVICE_PORT) || 3003,
      },
    });
  }

  getFrontendContent(url: string) {
    return this.client.send({ cmd: 'get-frontend-content' }, url);
  }
}
