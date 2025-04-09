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
import { CreateProductionLogDto } from './dto/request/create-production-log.dto';
import { UpdateProductionLogDto } from './dto/request/update-production-log.dto';
import { ProductionLogFullDto } from './dto/response/production-log-full.dto';
import { ProductionLogDto } from './dto/response/production-log.dto';
import { ProductionLogsService } from './production-logs.service';

@Controller('productionLog')
export class ProductionLogsController {
  saleOrdersService: any;
  constructor(private readonly productionLogsService: ProductionLogsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductionLogDto,
    description: 'Production log successfully created',
  })
  @ApiBadRequestResponse({ description: 'Request body must match the schema' })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  create(@Body() createProductionLogDto: CreateProductionLogDto) {
    return this.productionLogsService.create(createProductionLogDto);
  }

  @Get()
  @ApiOkResponse({
    type: ProductionLogFullDto,
    description: 'Productioion logs successfully fetched',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  list(
    @Query('memberId') memberId?: number,
    @Query('startDate', new ParseDatePipe({ optional: true })) startDate?: Date,
    @Query('endDate', new ParseDatePipe({ optional: true })) endDate?: Date,
  ) {
    return this.productionLogsService.listFull(memberId, startDate, endDate);
  }

  @Get(':id')
  @ApiOkResponse({
    type: ProductionLogFullDto,
    description: 'Production log found',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find log with the specified id',
  })
  getById(@Param('id') id: number) {
    return this.productionLogsService.getFullById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: ProductionLogDto,
    description: 'Production Log successfully patched',
  })
  @ApiBadRequestResponse({ description: 'Request body must match the schema' })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find log with the specified id',
  })
  update(
    @Param('id') id: number,
    @Body() updateProductionLogDto: UpdateProductionLogDto,
  ) {
    return this.productionLogsService.update(id, updateProductionLogDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: ProductionLogDto,
    description: 'Production log successfully deleted',
  })
  @ApiUnauthorizedResponse({ description: 'User must be logged in' })
  @ApiNotFoundResponse({
    description: 'Could not find log with the specified id',
  })
  delete(@Param('id') id: number) {
    return this.productionLogsService.delete(id);
  }
}
