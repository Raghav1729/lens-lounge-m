// microservice-setup.ts
import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/**
 * Connects a microservice to the main NestJS application and starts it.
 *
 * @param app The INestApplication instance of the NestJS application.
 * @returns A promise that resolves once the microservice is successfully started.
 */
export const connectMicroservice = async (
  app: INestApplication,
): Promise<void> => {
  // Define the microservice options
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.TCP, // Use TCP transport for the microservice
    options: {
      host: 'localhost', // The host where the microservice is running
      port: 8877, // The port where the microservice is listening
    },
  };

  console.log('🎉 Connecting to microservice... 🚀');

  // Connect the microservice to the application
  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);

  console.log('🔌 Microservice connected! Starting it up... 🎬');

  // Start the microservice(s)
  await app.startAllMicroservices();

  console.log('✅ Microservice is up and running! 🎉');
};
