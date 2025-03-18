import { ApiProperty } from '@nestjs/swagger';

export class SaleOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  memberId: number;
}
