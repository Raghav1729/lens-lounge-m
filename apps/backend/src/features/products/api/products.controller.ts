import { SkipThrottle } from '@nestjs/throttler';
import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAndSaveCreateRandomProductsCommand } from '../application/create-and-save-create-random-products.use-case';

import { ApiTags } from '@nestjs/swagger';
import { ParseQueriesService } from '../../../../../libs/common/query/parse-queries.service';
import { ParseQueriesDto } from '../../../../../libs/common/query/dto/parse-queries.dto';

@SkipThrottle()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly parseQueriesService: ParseQueriesService,
    private readonly commandBus: CommandBus,
  ) {}
  @Get('/test-products')
  async getBlogsOwnedByCurrentUser(@Query() query: any): Promise<string> {
    const queryData: ParseQueriesDto =
      await this.parseQueriesService.getQueriesData(query);

    const countProducts: number = queryData.countProducts;

    return await this.commandBus.execute(
      new CreateAndSaveCreateRandomProductsCommand(countProducts),
    );
  }
}
