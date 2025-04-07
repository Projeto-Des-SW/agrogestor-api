import { DatabaseService } from 'src/database/database.service';
import { CreateProductionEntryDto } from './dto/request/create-production-entry.dto';

export class ProductionLogsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create({
    date,
    entries,
    memberId,
  }: {
    date: Date;
    entries: CreateProductionEntryDto[];
    memberId: number;
  }) {
    return this.databaseService.productionLog.create({
      data: {
        date,
        member: {
          connect: { id: memberId },
        },
        productionEntries: {
          create: entries,
        },
      },
    });
  }

  findById(id: number) {
    return this.databaseService.productionLog.findUnique({ where: { id } });
  }

  findFullById(id: number) {
    return this.databaseService.productionLog.findUnique({
      where: { id },
      include: {
        member: true,
        productionEntries: true,
      },
    });
  }

  listAll() {
    return this.databaseService.productionLog.findMany({
      orderBy: { date: 'desc' },
    });
  }

  listFull(memberId?: number, startDate?: Date, endDate?: Date) {
    return this.databaseService.productionLog.findMany({
      where: {
        memberId,
        date: { gte: startDate, lte: endDate },
      },
      include: {
        member: true,
        productionEntries: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  update(
    id: number,
    {
      date,
      memberId,
      entries,
    }: Partial<{
      date: Date;
      memberId: number;
      entries: CreateProductionEntryDto[];
    }>,
  ) {
    return this.databaseService.productionLog.update({
      where: { id },
      data: {
        date,
        member: { connect: { id: memberId } },
        productionEntries: {
          deleteMany: entries ? {} : undefined,
          create: entries,
        },
      },
    });
  }

  delete(id: number) {
    return this.databaseService.productionLog.delete({ where: { id } });
  }
}
