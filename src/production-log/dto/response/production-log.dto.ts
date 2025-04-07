import { ApiProperty } from '@nestjs/swagger';

export class ProductionLogDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  memberId: number;
}
