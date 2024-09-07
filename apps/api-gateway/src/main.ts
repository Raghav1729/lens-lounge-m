import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });

  // Start the gateway and microservice listening
  await app.startAllMicroservices();
  await app.listen(3000); // Gateway listens on port 3000
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { ApiGatewayModule } from './api-gateway.module';
// import { Transport } from '@nestjs/microservices';
//
// async function bootstrap() {
//   const app = await NestFactory.create(ApiGatewayModule);
//
//   const port = process.env.PORT || 5001;
//   // Start the application and listen on the specified port
//   await app.listen(port, () => {
//     console.log(`Api-gateway app listening on port: ${port}`);
//   });
//
//   const baseUrl = await app.getUrl();
//   console.log(`Application is running on url: ${baseUrl}`);
// }
// bootstrap();
