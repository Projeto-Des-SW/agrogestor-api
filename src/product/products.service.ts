import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getByNameOrCreate(name: string) {
    let product = await this.productsRepository.findByName(name);
    if (!product) product = await this.productsRepository.create(name);
    return product;
  }

  listAll() {
    return this.productsRepository.listAll();
  }
}
