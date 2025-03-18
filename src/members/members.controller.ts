import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Member created',
    example: {
      name: 'Member',
      id: 1,
      disabled: false,
      groupId: 1,
      group: { name: 'Group', id: 1, disabled: false },
    },
  })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All members fetched',
    example: [
      {
        name: 'Member',
        id: 1,
        disabled: false,
        groupId: 1,
        group: { name: 'Group', id: 1, disabled: false },
      },
    ],
  })
  @ApiUnauthorizedResponse()
  listAll() {
    return this.membersService.listAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Member successfully fetched',
    example: {
      name: 'Member',
      id: 1,
      disabled: false,
      groupId: 1,
      group: { name: 'Group', id: 1, disabled: false },
    },
  })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.getById(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.delete(id);
  }
}
