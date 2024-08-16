import { Module } from '@nestjs/common';
import { AuthDecoratorsService } from './api-documentation/decorators-service/auth-decorators-service';
import { BloggerDecoratorsService } from './api-documentation/decorators-service/blogger-decorators-service';
import { SuperAdminDecoratorsService } from './api-documentation/decorators-service/super-admin-decorators-service';
import { UsersDecoratorsService } from './api-documentation/decorators-service/users-decorators-service';
import { UuidErrorResolver } from './common/helpers/uuid-error-resolver';
import { JsonUtils } from './common/helpers/json-utils';
import { KeyResolver } from './common/helpers/key-resolver';
import { CalculatorExpirationDate } from './common/helpers/calculator-expiration-date/calculator-expiration-date';
import { UsersModule } from '../backend/src/features/users/users.module';
import { MailsService } from './common/mails/application/mails.service';
import { ParseQueriesService } from './common/query/parse-queries.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresOptions } from '../backend/src/db/type-orm/options/type-orm-postgres.options';
import { CustomConfigModule } from '../backend/src/config/custom.config-module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresOptions, // Use the OrmOptions class as the stripe
    }),
    UsersModule,
    CqrsModule,
  ],
  controllers: [],
  providers: [
    AuthDecoratorsService,
    BloggerDecoratorsService,
    SuperAdminDecoratorsService,
    UsersDecoratorsService,
    UuidErrorResolver,
    KeyResolver,
    CalculatorExpirationDate,
    ParseQueriesService,
    JsonUtils,
    MailsService,
  ],
})
export class LibsModule {}
