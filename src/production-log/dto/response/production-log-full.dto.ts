import { ApiProperty } from '@nestjs/swagger';
import { Member, Period, ProductionEntry } from '@prisma/client';

export class ProductionLogFullDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

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
        date: { type: 'string' },
        quantity: { type: 'number' },
        productionLogId: { type: 'number' },
        price: { type: 'number' },
        period: { enum: [Period.MORNING, Period.AFTERNOON] },
      },
    },
  })
  productionEntries: ProductionEntry[];
}
