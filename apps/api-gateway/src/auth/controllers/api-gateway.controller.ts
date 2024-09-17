import { Response } from 'express';
import { PaymentServiceProxy } from '../../proxy/payment-service.proxy';
import { FrontendProxy } from '../../proxy/frontend.proxy';
import { BackendProxy } from '../../proxy/backend.proxy';
import { firstValueFrom, retry, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly paymentServiceProxy: PaymentServiceProxy,
    private readonly frontendProxy: FrontendProxy,
    private readonly backendProxy: BackendProxy,
  ) {}

  // Handle payment requests
  @Get('api/payments/:action')
  async handlePaymentRequests(
    @Param('action') action: string,
    @Res() res: Response,
  ) {
    const client = this.paymentServiceProxy.getClient();
    try {
      const data = await firstValueFrom(client.send({ cmd: action }, {}));
      res.send(data);
    } catch (err) {
      console.error('Error handling payment request:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Failed to process payment request',
        error: err.message,
      });
    }
  }

  // Handle backend requests with retry logic
  @Get('api/backend/:action')
  handleBackendRequests(@Param('action') action: string, @Res() res: Response) {
    console.log('Handling backend request');
    const client = this.backendProxy.getClient();

    client
      .send({ cmd: action }, {})
      .pipe(
        retry(3), // Retry 3 times before failing
        catchError((error) => {
          console.error('Error handling backend request:', error);
          return throwError(() => new Error('Backend service is unreachable'));
        }),
      )
      .subscribe({
        next: (data) => res.send(data),
        error: (err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message),
      });
  }

  // Handle frontend requests
  @Get('*')
  async handleFrontendRequests(@Param() params: any, @Res() res: Response) {
    const url = params[0]; // Access the wildcard route parameter
    try {
      // Fetching frontend content
      const response = await firstValueFrom(
        this.frontendProxy.getFrontendContent(url),
      );
      res.send(response.data); // Sending the frontend content response
    } catch (err) {
      console.error('Error handling frontend-microservice request:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Failed to load frontend-microservice content',
        error: err.message,
      });
    }
  }
}
