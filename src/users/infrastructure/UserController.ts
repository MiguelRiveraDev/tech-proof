import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateUserService } from '../application/create-user.service';
import { GetUserService } from '../application/get-user.service';
import { GetAllUsersService } from '../application/get-all-users.service';
import { DeleteUserService } from '../application/delete-user.service';
import { User } from '../domain/User';

@Controller('users')
export class UserController {
  constructor(
    private createUser: CreateUserService,
    private getUser: GetUserService,
    private getAllUsers: GetAllUsersService,
    private deleteUser: DeleteUserService,
  ) {}

  @Post()
  async create(
    @Body() body: { id: string; name: string; email: string },
  ): Promise<void> {
    const { id, name, email } = body;
    return await this.createUser.execute(id, name, email);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.getAllUsers.execute();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
