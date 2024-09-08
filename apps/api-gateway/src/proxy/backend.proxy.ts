import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class BackendProxy implements OnModuleInit {
  private client: ClientProxy;

  // Initialize the client during module initialization
  onModuleInit() {
    // const host: string = process.env.BACKEND_SERVICE_HOST || 'localhost';
    // const port: number = parseInt(process.env.BACKEND_SERVICE_PORT) || 3001;

    const host: string = 'localhost';
    const port: number = 3001;

    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    });

    // Optional: Add some logs or checks to ensure initialization worked
    console.log(`BackendProxy initialized with host: ${host}, port: ${port}`);
  }

  // Method to retrieve the client
  getClient() {
    if (!this.client) {
      throw new Error('BackendProxy client is not initialized');
    }
    return this.client;
  }
}
