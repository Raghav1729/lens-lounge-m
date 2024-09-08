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
    // const host: string = process.env.FRONTEND_SERVICE_HOST || 'localhost';
    // const port: number = Number(process.env.FRONTEND_SERVICE_PORT) || 3003;

    const host: string = 'localhost';
    const port: number = 3003;

    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    });
  }

  getFrontendContent(url: string) {
    return this.client.send({ cmd: 'get-frontend-microservice-content' }, url);
  }
}
