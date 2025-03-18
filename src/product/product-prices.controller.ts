import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ProductPricesService } from './product-prices.service';

@Controller('prices')
export class ProductPricesController {
  constructor(private readonly productPricesService: ProductPricesService) {}

  @Get(':id')
  @ApiOkResponse({
    schema: { oneOf: [{ $ref: 'string' }, { $ref: 'null' }] },
    description: 'Successfully returned the latest product price or null',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  async findLatestByProduct(@Param('id') productId: number) {
    return (
      (await this.productPricesService.findLatestByProduct(productId))?.price ??
      Prisma.Decimal(0)
    );
  }
}
