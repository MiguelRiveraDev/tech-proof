
import { DomainEvent } from '../domain/DomainEvent';
import { DomainEventPublisher } from '../domain/DomainEventPublisher';

export class EventLogger {
  constructor() {
    DomainEventPublisher.subscribe('UserCreatedEvent', this.handleEvent);
    // Subscribe to other events as needed
  }

  private handleEvent(event: DomainEvent): void {
    console.log(`Event received: ${event.constructor.name}`, event);
  }
}