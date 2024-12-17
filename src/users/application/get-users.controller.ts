import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../domain/User';
import { GetUserService } from './get-user.service';

@Controller('users')
export class GetUserController {
  constructor(private getUser: GetUserService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    const user = await this.getUser.execute(id);
    return user;
  }
}
