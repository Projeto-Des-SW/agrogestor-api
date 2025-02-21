import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minLength: 5 })
  @MinLength(5)
  username: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsString()
  name: string;
}
