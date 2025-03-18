import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupsModule } from 'src/groups/groups.module';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { IMembersRepository } from './members.repository.interface';
import { MembersService } from './members.service';

@Module({
  imports: [DatabaseModule, GroupsModule],
  providers: [
    MembersService,
    { provide: IMembersRepository, useClass: MembersRepository },
  ],
  controllers: [MembersController],
})
export class MembersModule {}
