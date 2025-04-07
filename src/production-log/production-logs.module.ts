import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MembersModule } from 'src/members/members.module';
import { ProductionLogsController } from './production-logs.controller';
import { ProductionLogsRepository } from './production-logs.repository';
import { ProductionLogsService } from './production-logs.service';

@Module({
  imports: [DatabaseModule, MembersModule],
  providers: [ProductionLogsService, ProductionLogsRepository],
  controllers: [ProductionLogsController],
})
export class ProductionLogsModule {}
