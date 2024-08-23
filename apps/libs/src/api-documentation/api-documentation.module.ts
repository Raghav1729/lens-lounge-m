import { Module } from '@nestjs/common';
import { ApiDocService } from './api-doc-service';
import { SuperAdminDecoratorsService } from './decorators-service/super-admin-decorators-service';
import { UsersDecoratorsService } from './decorators-service/users-decorators-service';
import { BloggerDecoratorsService } from './decorators-service/blogger-decorators-service';
import { AuthDecoratorsService } from './decorators-service/auth-decorators-service';

@Module({
  providers: [
    ApiDocService,
    SuperAdminDecoratorsService,
    UsersDecoratorsService,
    BloggerDecoratorsService,
    AuthDecoratorsService,
  ],
  exports: [ApiDocService],
})
export class ApiDocumentationModule {}
