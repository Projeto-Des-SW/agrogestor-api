import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MembersModule } from 'src/members/members.module';
import { ProductsModule } from 'src/product/products.module';
import { SalesController } from './sales.controller';
import { SalesRepository } from './sales.repository';
import { SalesService } from './sales.service';

@Module({
  imports: [DatabaseModule, MembersModule, ProductsModule],
  providers: [SalesService, SalesRepository],
  controllers: [SalesController],
})
export class SalesModule {}
