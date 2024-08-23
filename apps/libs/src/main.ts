import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LibsModule } from './libs.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(LibsModule, {
    rawBody: true,
  });

  // // Set global prefix for all routes
  // app.setGlobalPrefix('api');

  // Retrieve the port from environment variables, default to 5002 if not provided
  const port = process.env.PORT || 5004;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`Libs app listening on port: ${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`Application is running on url: ${baseUrl}`);
}
bootstrap();
