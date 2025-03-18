import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateSaleItemDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty({ type: String })
  @IsDecimal()
  price: Prisma.Decimal;

  @ApiProperty()
  @IsString()
  productName: string;
}
