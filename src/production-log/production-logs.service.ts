import { Injectable, NotFoundException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { CreateProductionLogDto } from './dto/request/create-production-log.dto';
import { UpdateProductionLogDto } from './dto/request/update-production-log.dto';
import { ProductionLogsRepository } from './production-logs.repository';

@Injectable()
export class ProductionLogsService {
  constructor(
    private readonly membersService: MembersService,
    private readonly productionLogsRepository: ProductionLogsRepository,
  ) {}

  async create({ date, entries, memberName }: CreateProductionLogDto) {
    const member = await this.membersService.getOrCreate({
      name: memberName,
      groupName: 'Outros',
    });
    return this.productionLogsRepository.create({
      date,
      entries,
      memberId: member.id,
    });
  }

  async getById(id: number) {
    const log = await this.productionLogsRepository.findById(id);
    if (!log) throw new NotFoundException();
    return log;
  }

  async getFullById(id: number) {
    const log = await this.productionLogsRepository.findFullById(id);
    if (!log) throw new NotFoundException();
    return log;
  }

  async listFull(memberId?: number, startDate?: Date, endDate?: Date) {
    return this.productionLogsRepository.listFull(memberId, startDate, endDate);
  }

  async update(
    id: number,
    { date, memberName, entries }: UpdateProductionLogDto,
  ) {
    const log = await this.getById(id);

    const member = memberName
      ? await this.membersService.getOrCreate({
          name: memberName,
          groupName: 'Outros',
        })
      : await this.membersService.getById(log.memberId);

    return this.productionLogsRepository.update(id, {
      date,
      memberId: member.id,
      entries,
    });
  }

  async delete(id: number) {
    await this.getById(id);
    return this.productionLogsRepository.delete(id);
  }
}
