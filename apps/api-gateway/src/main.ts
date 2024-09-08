import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../../backend/src/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const configService = app.get<ConfigService<ConfigType, true>>(ConfigService);

  const redisUrl = configService.get<string>('db.redis.REDIS_URL', {
    infer: true,
  });

  console.log(`Redis URL: ${redisUrl}`);

  // const redisUrl = 'redis://localhost:6379';

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: redisUrl,
    },
  });

  // Start the gateway and microservice listening
  await app.startAllMicroservices();
  await app.listen(3000); // Gateway listens on port 3000
}
bootstrap();
