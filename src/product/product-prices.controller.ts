import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductPricesService } from './product-prices.service';

@Controller('prices')
export class ProductPricesController {
  constructor(private readonly productPricesService: ProductPricesService) {}

  @Get()
  @ApiOkResponse({
    schema: {
      oneOf: [
        {
          $ref: 'object',
          properties: {
            id: { type: 'number' },
            date: { type: 'string' },
            price: { type: 'number' },
            groupId: { type: 'number' },
            productId: { type: 'number' },
          },
        },
        { $ref: 'null' },
      ],
    },
    description: 'Successfully returned the latest product prices or null',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  async findManyLatestByProductDateAndMemberName(
    @Query('product') product: string,
    @Query('date') date: Date,
    @Query('memberName') memberName: string,
  ) {
    return this.productPricesService.findManyLatestByProductDateAndMemberName(
      product,
      date,
      memberName,
    );
  }
}
