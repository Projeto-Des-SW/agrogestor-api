import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { CreateSaleItemDto } from './create-sale-item.dto';

export class CreateSaleOrderDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsInt()
  memberId: number;

  @ApiProperty({ type: [CreateSaleItemDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];
}
