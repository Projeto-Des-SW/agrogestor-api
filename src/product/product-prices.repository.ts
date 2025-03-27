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

  async findManyLatestByProductDateAndMemberName(
    product: string,
    date: Date,
    memberName: string,
  ) {
    return await this.databaseService.productPrice.findFirst({
      where: {
        product: { name: product },
        group: { members: { some: { name: memberName } } },
        date: { lt: date },
      },
      orderBy: { date: 'desc' },
    });
  }
}
