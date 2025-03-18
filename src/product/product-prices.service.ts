import { Injectable } from '@nestjs/common';
import { ProductPrice } from '@prisma/client';
import { ProductPricesRepository } from './product-prices.repository';

@Injectable()
export class ProductPricesService {
  constructor(
    private readonly productPricesRepository: ProductPricesRepository,
  ) {}

  async getProductPriceOrCreate(productPrice: Omit<ProductPrice, 'id'>) {
    let price =
      await this.productPricesRepository.findProductPrice(productPrice);
    if (!price) price = await this.productPricesRepository.create(productPrice);
    return price;
  }

  findLatestByProduct(productId: number) {
    return this.productPricesRepository.findLatestByProduct(productId);
  }
}
