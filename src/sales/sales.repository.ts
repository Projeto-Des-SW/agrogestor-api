import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SalesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create({
    date,
    memberId,
    items,
  }: {
    date: Date;
    memberId: number;
    items: { quantity: number; productPriceId: number }[];
  }) {
    return this.databaseService.saleOrder.create({
      data: {
        date,
        member: { connect: { id: memberId } },
        saleItems: {
          create: items.map((item) => ({
            quantity: item.quantity,
            productPrice: { connect: { id: item.productPriceId } },
          })),
        },
      },
    });
  }

  findById(id: number) {
    return this.databaseService.saleOrder.findUnique({ where: { id } });
  }

  findFullById(id: number) {
    return this.databaseService.saleOrder.findUnique({
      where: { id },
      include: {
        member: true,
        saleItems: {
          include: { productPrice: { include: { product: true } } },
        },
      },
    });
  }

  listAll() {
    return this.databaseService.saleOrder.findMany();
  }

  listFull(
    memberId?: number,
    groupId?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    return this.databaseService.saleOrder.findMany({
      where: {
        memberId,
        member: { groupId },
        date: { gte: startDate, lte: endDate },
      },
      include: {
        member: true,
        saleItems: {
          include: { productPrice: { include: { product: true } } },
        },
      },
    });
  }

  update(
    id: number,
    {
      date,
      memberId,
      items,
    }: Partial<{
      date: Date;
      memberId: number;
      items: { quantity: number; productPriceId: number }[];
    }>,
  ) {
    return this.databaseService.saleOrder.update({
      where: { id },
      data: {
        date,
        member: { connect: { id: memberId } },
        saleItems: {
          create: items?.map((item) => ({
            quantity: item.quantity,
            productPrice: { connect: { id: item.productPriceId } },
          })),
        },
      },
    });
  }

  delete(id: number) {
    return this.databaseService.saleOrder.delete({ where: { id } });
  }
}
