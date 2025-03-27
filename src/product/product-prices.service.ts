import { Injectable } from '@nestjs/common';
import { ProductPrice } from '@prisma/client';
import { ProductPricesRepository } from './product-prices.repository';

@Injectable()
export class ProductPricesService {
  constructor(
    private readonly productPricesRepository: ProductPricesRepository,
  ) {}

  async getProductPriceOrCreate(productPrice: Omit<ProductPrice, 'id'>) {
    const price =
      await this.productPricesRepository.findProductPrice(productPrice);
    if (!price) return this.productPricesRepository.create(productPrice);
    return price;
  }

  findManyLatestByProductDateAndMemberName(
    product: string,
    date: Date,
    memberName: string,
  ) {
    return this.productPricesRepository.findManyLatestByProductDateAndMemberName(
      product,
      date,
      memberName,
    );
  }
}
