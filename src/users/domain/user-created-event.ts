
import { DomainEvent } from '../../shared/domain/DomainEvent';
import { User } from './User';

export class UserCreatedEvent extends DomainEvent {
  constructor(public readonly user: User) {
    super();
  }
}
