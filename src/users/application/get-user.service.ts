import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { USER_REPOSITORY } from '../users.constants';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}
