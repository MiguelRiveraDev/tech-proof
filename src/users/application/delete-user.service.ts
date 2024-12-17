import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';
import { USER_REPOSITORY } from '../users.constants';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
