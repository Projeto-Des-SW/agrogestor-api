import { ApiProperty } from '@nestjs/swagger';
import { Member, Product, ProductPrice, SaleItem } from '@prisma/client';

export class SaleOrderFullDto {
  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
      id: { type: 'number' },
      disabled: { type: 'boolean' },
      groupId: { type: 'number' },
    },
  })
  member: Member;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        quantity: { type: 'number' },
        productPriceId: { type: 'number' },
        saleOrderId: { type: 'number' },
        productPrice: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            groupId: { type: 'number' },
            date: { type: 'string' },
            price: { type: 'string' },
            productId: { type: 'number' },
            product: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  saleItems: (SaleItem & {
    productPrice: ProductPrice & { product: Product };
  })[];
}
