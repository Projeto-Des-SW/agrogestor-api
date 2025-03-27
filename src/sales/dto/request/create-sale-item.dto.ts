import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateSaleItemDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty({ type: String })
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  productName: string;
}
