import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupsModule } from 'src/groups/groups.module';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { MembersService } from './members.service';

@Module({
  imports: [DatabaseModule, GroupsModule],
  providers: [MembersService, MembersRepository],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
