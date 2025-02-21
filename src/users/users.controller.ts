import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    description: 'User successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Body does not follow expected format',
  })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Insufficient permissions' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Patch()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ description: 'User updated' })
  @ApiBadRequestResponse({
    description: 'Body does not follow expected format',
  })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Insufficient permissions' })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(updateUserDto.username, updateUserDto);
  }
}
