import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProductionEntryDto } from './create-production-entry.dto';

export class CreateProductionLogDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsString()
  memberName: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateProductionEntryDto)
  entries: CreateProductionEntryDto[];
}
