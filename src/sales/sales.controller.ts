import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseDatePipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateSaleOrderDto } from './dto/request/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/request/update-sale-order.dto';
import { SaleOrderFullDto } from './dto/response/sale-order-full.dto';
import { SaleOrderDto } from './dto/response/sale-order.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly saleOrdersService: SalesService) {}

  @Post()
  @ApiCreatedResponse({
    type: SaleOrderDto,
    description: 'Sale order successfully created',
  })
  @ApiBadRequestResponse({ description: 'Request body must match the schema' })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  create(@Body() createSaleOrderDto: CreateSaleOrderDto) {
    return this.saleOrdersService.create(createSaleOrderDto);
  }

  @Get()
  @ApiOkResponse({
    type: SaleOrderFullDto,
    description: 'Sale orders successfully fetched',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  list(
    @Query('memberId') memberId?: number,
    @Query('groupId') groupId?: number,
    @Query('startDate', new ParseDatePipe({ optional: true })) startDate?: Date,
    @Query('endDate', new ParseDatePipe({ optional: true })) endDate?: Date,
  ) {
    return this.saleOrdersService.listFull(
      memberId,
      groupId,
      startDate,
      endDate,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: SaleOrderFullDto, description: 'Sale order found' })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find order with the specified id',
  })
  getById(@Param('id') id: number) {
    return this.saleOrdersService.getFullById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: SaleOrderDto,
    description: 'Sale order successfully patched',
  })
  @ApiBadRequestResponse({ description: 'Request body must match the schema' })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find order with the specified id',
  })
  update(
    @Param('id') id: number,
    @Body() updateSaleOrderDto: UpdateSaleOrderDto,
  ) {
    return this.saleOrdersService.update(id, updateSaleOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SaleOrderDto,
    description: 'Sale order successfully deleted',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find order with the specified id',
  })
  delete(@Param('id') id: number) {
    return this.saleOrdersService.delete(id);
  }
}
