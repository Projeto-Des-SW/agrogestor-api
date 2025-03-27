import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getByNameOrCreate(name: string) {
    const product = await this.productsRepository.findByName(name);
    if (!product) return this.productsRepository.create(name);
    return product;
  }

  listAll() {
    return this.productsRepository.listAll();
  }
}
