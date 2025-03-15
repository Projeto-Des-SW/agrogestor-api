import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { IUsersRepository } from './users.repository.interface';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
