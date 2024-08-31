import { Module } from '@nestjs/common';
import { AppController } from './modules/auth/controllers/app.controller';
import { AppService } from './modules/auth/services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
