import { Injectable } from '@nestjs/common';
import { ErrorMessages } from './filters/custom-errors-messages';
import { JsonUtils } from './helpers/json-utils';
import { KeyResolver } from './helpers/key-resolver';
import { PaginatorDto } from './helpers/paginator.dto';
import { UuidErrorResolver } from './helpers/uuid-error-resolver';
import { BlogExistValidationPipe } from './pipes/blog-exist-validation.pipe';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { PostExistValidationPipe } from './pipes/post-exist-validation.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { ParseQueriesDto } from './query/dto/parse-queries.dto';
import { BlogExistsValidator } from './validators/blog-exists.validator';
import { CodeExistsValidator } from './validators/code-exists.validator';
import { EmailAndLoginNotExistValidator } from './validators/email-and-login-not-exist.validator';
import { IsArrayValidator } from './validators/is-array.validator';
import { LoginEmailExistsValidator } from './validators/login-email-exists.validator';

@Injectable()
export class CommonService {
  constructor(
    private readonly jsonUtils: JsonUtils,
    private readonly keyResolver: KeyResolver,
    private readonly paginatorDto: PaginatorDto,
    private readonly uuidErrorResolver: UuidErrorResolver,
    private readonly blogExistValidationPipe: BlogExistValidationPipe,
    private readonly fileValidationPipe: FileValidationPipe,
    private readonly postExistValidationPipe: PostExistValidationPipe,
    private readonly trimPipe: TrimPipe,
    private readonly blogExistsValidator: BlogExistsValidator,
    private readonly codeExistsValidator: CodeExistsValidator,
    private readonly emailAndLoginNotExistValidator: EmailAndLoginNotExistValidator,
    private readonly isArrayValidator: IsArrayValidator,
    private readonly loginEmailExistsValidator: LoginEmailExistsValidator,
  ) {}

  getErrorMessages() {
    return ErrorMessages;
  }

  getJsonUtils() {
    return this.jsonUtils;
  }

  getKeyResolver() {
    return this.keyResolver;
  }

  getPaginatorDto() {
    return this.paginatorDto;
  }

  getUuidErrorResolver() {
    return this.uuidErrorResolver;
  }

  getBlogExistValidationPipe() {
    return this.blogExistValidationPipe;
  }

  getFileValidationPipe() {
    return this.fileValidationPipe;
  }

  getPostExistValidationPipe() {
    return this.postExistValidationPipe;
  }

  getTrimPipe() {
    return this.trimPipe;
  }

  getBlogExistsValidator() {
    return this.blogExistsValidator;
  }

  getCodeExistsValidator() {
    return this.codeExistsValidator;
  }

  getEmailAndLoginNotExistValidator() {
    return this.emailAndLoginNotExistValidator;
  }

  getIsArrayValidator() {
    return this.isArrayValidator;
  }

  getLoginEmailExistsValidator() {
    return this.loginEmailExistsValidator;
  }

  async getQueriesData(queries: any): Promise<ParseQueriesDto> {
    return queries;
  }
}
