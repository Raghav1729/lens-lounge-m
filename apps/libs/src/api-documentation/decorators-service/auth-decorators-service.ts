import { applyDecorators, HttpStatus, Injectable } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthMethods } from '../enums/auth-methods.enum';
import { UserIdEmailLoginDto } from '../../../../backend/src/features/auth/dto/profile.dto';

@Injectable()
export class AuthDecoratorsService {
  static getDecorator(method: string, description?: string) {
    let summary;

    switch (method) {
      case AuthMethods.Me:
        summary = 'Get information about the current user';
        return applyDecorators(
          ApiOperation({ summary, description }),
          ApiBearerAuth(),
          ApiResponse({
            status: HttpStatus.OK,
            type: UserIdEmailLoginDto,
          }),
          ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        );

      default:
        // If no key matches, return an empty set of swagger
        return applyDecorators();
    }
  }
}
