import { Module } from '@nestjs/common';
import { ApiGatewayController } from './auth/controllers/api-gateway.controller';
import { PaymentServiceProxy } from './proxy/payment-service.proxy';
import { FrontendProxy } from './proxy/frontend.proxy';
import { BackendProxy } from './proxy/backend.proxy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ApiGatewayController],
  providers: [PaymentServiceProxy, FrontendProxy, BackendProxy],
})
export class ApiGatewayModule {}
