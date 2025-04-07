import { ApiProperty } from '@nestjs/swagger';
import { Period } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber } from 'class-validator';

export class CreateProductionEntryDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsEnum(Period)
  period: Period;
}
