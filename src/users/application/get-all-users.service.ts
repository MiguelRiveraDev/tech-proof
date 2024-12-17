import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../users.constants';
@Injectable()
export class GetAllUsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
