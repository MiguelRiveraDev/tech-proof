import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../users.constants';
import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/User';
import { DomainEventPublisher } from '../../shared/domain/DomainEventPublisher';
import { UserCreatedEvent } from '../domain/user-created-event';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string, name: string, email: string): Promise<void> {
    const user = new User(id, name, email);
    await this.userRepository.save(user);
    DomainEventPublisher.publish(new UserCreatedEvent(user));
  }
}
