import { Injectable } from '@nestjs/common';
import { ProductPrice } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductPricesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create({ date, groupId, price, productId }: Omit<ProductPrice, 'id'>) {
    return this.databaseService.productPrice.create({
      data: {
        date,
        price,
        group: { connect: { id: groupId } },
        product: { connect: { id: productId } },
      },
    });
  }

  findProductPrice(productPrice: Omit<ProductPrice, 'id'>) {
    return this.databaseService.productPrice.findFirst({
      where: productPrice,
    });
  }

  findLatestByProduct(productId: number) {
    return this.databaseService.productPrice.findFirst({
      where: { productId },
      orderBy: { date: 'desc' },
    });
  }
}
