import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentServiceProxy } from '../../proxy/payment-service.proxy';
import { FrontendProxy } from '../../proxy/frontend.proxy';
import { BackendProxy } from '../../proxy/backend.proxy';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly paymentServiceProxy: PaymentServiceProxy,
    private readonly frontendProxy: FrontendProxy,
    private readonly backendProxy: BackendProxy,
  ) {}

  @Get('api/payments/:action')
  handlePaymentRequests(@Param('action') action: string, @Res() res: Response) {
    const client = this.paymentServiceProxy.getClient();
    client.send({ cmd: action }, {}).subscribe({
      next: (data) => res.send(data),
      error: (err) => res.status(500).send(err),
    });
  }

  @Get('api/backend/:action')
  handleBackendRequests(@Param('action') action: string, @Res() res: Response) {
    const client = this.backendProxy.getClient();
    client.send({ cmd: action }, {}).subscribe({
      next: (data) => res.send(data),
      error: (err) => res.status(500).send(err),
    });
  }

  @Get('*')
  handleFrontendRequests(@Param() params: any, @Res() res: Response) {
    const url = params[0];
    this.frontendProxy.getFrontendContent(url).subscribe({
      next: (response) => res.send(response.data),
      error: (err) => res.status(500).send(err.message),
    });
  }
}
