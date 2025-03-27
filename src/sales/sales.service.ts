import { Injectable, NotFoundException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { ProductPricesService } from 'src/product/product-prices.service';
import { ProductsService } from 'src/product/products.service';
import { CreateSaleItemDto } from './dto/request/create-sale-item.dto';
import { CreateSaleOrderDto } from './dto/request/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/request/update-sale-order.dto';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(
    private readonly saleOrdersRepository: SalesRepository,
    private readonly membersService: MembersService,
    private readonly productsService: ProductsService,
    private readonly productPricesService: ProductPricesService,
  ) {}

  async convertDtoToSaleItem(groupId: number, dto: CreateSaleItemDto[]) {
    const items: { quantity: number; productPriceId: number }[] = [];
    for (const item of dto) {
      const product = await this.productsService.getByNameOrCreate(
        item.productName,
      );
      const price = await this.productPricesService.getProductPriceOrCreate({
        date: item.date,
        price: item.price,
        groupId,
        productId: product.id,
      });
      items.push({
        quantity: item.quantity,
        productPriceId: price.id,
      });
    }
    return items;
  }

  async create({ date, items, memberName }: CreateSaleOrderDto) {
    const member = await this.membersService.getOrCreate({
      name: memberName,
      groupName: 'Outros',
    });
    return this.saleOrdersRepository.create({
      date,
      memberId: member.id,
      items: await this.convertDtoToSaleItem(member.groupId, items),
    });
  }

  async getById(id: number) {
    const sale = await this.saleOrdersRepository.findById(id);
    if (!sale) throw new NotFoundException();
    return sale;
  }

  async getFullById(id: number) {
    const sale = await this.saleOrdersRepository.findFullById(id);
    if (!sale) throw new NotFoundException();
    return sale;
  }

  async listFull(
    memberId?: number,
    groupId?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    return this.saleOrdersRepository.listFull(
      memberId,
      groupId,
      startDate,
      endDate,
    );
  }

  async update(id: number, { date, memberName, items }: UpdateSaleOrderDto) {
    const sale = await this.getById(id);

    const member = memberName
      ? await this.membersService.getOrCreate({
          name: memberName,
          groupName: 'Outros',
        })
      : await this.membersService.getById(sale.memberId);

    return this.saleOrdersRepository.update(id, {
      date,
      memberId: member.id,
      items: items
        ? await this.convertDtoToSaleItem(member.groupId, items)
        : undefined,
    });
  }

  async delete(id: number) {
    await this.getById(id);
    return this.saleOrdersRepository.delete(id);
  }
}
