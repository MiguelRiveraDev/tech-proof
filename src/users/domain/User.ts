import { DomainEventPublisher } from '../../shared/domain/DomainEventPublisher';
import { UserCreatedEvent } from './UserCreatedEvent';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
  ) {}

  static create(id: string, name: string, email: string): User {
    const user = new User(id, name, email);
    // Publish domain event
    DomainEventPublisher.publish(new UserCreatedEvent(user));
    return user;
  }
}
