import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({
    schema: { type: 'array', items: { type: 'string' } },
    description: 'Returns the list of product names',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  async listAll() {
    const products = await this.productsService.listAll();
    return products.map((p) => p.name);
  }
}
