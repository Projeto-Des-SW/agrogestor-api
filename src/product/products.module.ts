import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductPricesController } from './product-prices.controller';
import { ProductPricesRepository } from './product-prices.repository';
import { ProductPricesService } from './product-prices.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ProductPricesService,
    ProductPricesRepository,
    ProductsService,
    ProductsRepository,
  ],
  controllers: [ProductPricesController, ProductsController],
  exports: [ProductsService, ProductPricesService],
})
export class ProductsModule {}
