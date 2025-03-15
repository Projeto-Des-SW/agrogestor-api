import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MembersRepository } from './members.repository';
import { IMembersRepository } from './members.repository.interface';
import { MembersService } from './members.service';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [DatabaseModule, GroupsModule],
  providers: [
    MembersService,
    { provide: IMembersRepository, useClass: MembersRepository },
  ],
})
export class MembersModule {}
