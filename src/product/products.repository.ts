import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(name: string) {
    return this.databaseService.product.create({ data: { name } });
  }

  findByName(name: string) {
    return this.databaseService.product.findFirst({ where: { name } });
  }

  listAll() {
    return this.databaseService.product.findMany();
  }
}
