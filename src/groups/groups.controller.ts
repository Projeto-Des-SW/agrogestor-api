import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOkResponse({ example: [{ name: 'Group', id: 1, disabled: false }] })
  @ApiUnauthorizedResponse()
  listAll() {
    return this.groupsService.listAll();
  }
}
