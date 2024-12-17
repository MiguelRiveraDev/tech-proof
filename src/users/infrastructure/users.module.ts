import { Module } from '@nestjs/common';
import { GetUserService } from '../application/get-user.service';
import { DeleteUserService } from '../application/delete-user.service';
import { UserController } from './user.controller';
import { GetAllUsersService } from '../application/get-all-users.service';
import { CreateUserService } from '../application/create-user.service';
import { USER_REPOSITORY } from '../users.constants';
import { InMemoryUserRepository } from '../infrastructure/in-memory-user-repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    GetUserService,
    DeleteUserService,
    GetAllUsersService,
    CreateUserService,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [GetUserService],
})
export class UserModule {}
