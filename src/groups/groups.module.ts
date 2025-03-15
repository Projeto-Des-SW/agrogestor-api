import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupsRepository } from './groups.repository';
import { IGroupsRepository } from './groups.repository.interface';
import { GroupsService } from './groups.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupsService,
    { provide: IGroupsRepository, useClass: GroupsRepository },
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
