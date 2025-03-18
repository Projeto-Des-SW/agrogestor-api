import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupsRepository } from './groups.repository';
import { GroupsService } from './groups.service';

@Module({
  imports: [DatabaseModule],
  providers: [GroupsService, GroupsRepository],
  exports: [GroupsService],
})
export class GroupsModule {}
