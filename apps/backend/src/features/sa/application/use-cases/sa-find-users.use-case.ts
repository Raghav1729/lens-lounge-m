import { UsersRepo } from '../../../users/infrastructure/users-repo';
import { UsersService } from '../../../users/application/users.service';
import { SaUserViewModel } from '../../views/sa-user-view-model';
import { ParseQueriesDto } from '../../../../../../../libs/common/src/query/dto/parse-queries.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaginatorDto } from '../../../../../../../libs/common/src/helpers/paginator.dto';

export class SaFindUsersCommand {
  constructor(public queryData: ParseQueriesDto) {}
}

@CommandHandler(SaFindUsersCommand)
export class SaFindUsersUseCase implements ICommandHandler<SaFindUsersCommand> {
  constructor(
    protected usersRepo: UsersRepo,
    protected usersService: UsersService,
  ) {}
  async execute(command: SaFindUsersCommand): Promise<PaginatorDto> {
    const { queryData } = command;

    const arrUsers = await this.usersRepo.findUsers(queryData);

    const totalCount = await this.usersRepo.totalCountUsers(queryData);

    const pagesCount = Math.ceil(
      totalCount / queryData.queryPagination.pageSize,
    );

    const transformedArrUsers: SaUserViewModel[] =
      await this.usersService.transformUserForSa(arrUsers);

    return {
      pagesCount: pagesCount,
      page: queryData.queryPagination.pageNumber,
      pageSize: queryData.queryPagination.pageSize,
      totalCount: totalCount,
      items: transformedArrUsers,
    };
  }
}
