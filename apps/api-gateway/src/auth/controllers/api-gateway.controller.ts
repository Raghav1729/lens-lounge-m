import { PaymentServiceProxy } from '../../proxy/payment-service.proxy';
import { FrontendProxy } from '../../proxy/frontend.proxy';
import { BackendProxy } from '../../proxy/backend.proxy';
import { firstValueFrom, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly paymentServiceProxy: PaymentServiceProxy,
    private readonly frontendProxy: FrontendProxy,
    private readonly backendProxy: BackendProxy,
  ) {}

  // Handle payment requests
  @Get('api/payments/:action')
  async handlePaymentRequests(@Param('action') action: string) {
    const client = this.paymentServiceProxy.getClient();
    try {
      return await firstValueFrom(client.send({ cmd: action }, {}));
    } catch (err) {
      console.error('Error handling payment request:', err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to process payment request',
        error: err.message,
      };
    }
  }

  // Handle backend requests with retry logic
  @Get('api/backend/:action')
  handleBackendRequests(@Param('action') action: string) {
    const client = this.backendProxy.getClient();

    return client.send({ cmd: action }, {}).pipe(
      retry(3), // Retry 3 times before failing
      catchError((error) => {
        console.error('Error handling backend request:', error);
        throw new Error('Backend service is unreachable');
      }),
    );
  }

  // Handle frontend requests
  @Get('*')
  async handleFrontendRequests(@Param() params: any) {
    const url = params[0]; // Access the wildcard route parameter
    try {
      const response = await firstValueFrom(
        this.frontendProxy.getFrontendContent(url),
      );
      return response.data; // Return the frontend content response
    } catch (err) {
      console.error('Error handling frontend-microservice request:', err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to load frontend-microservice content',
        error: err.message,
      };
    }
  }
}
