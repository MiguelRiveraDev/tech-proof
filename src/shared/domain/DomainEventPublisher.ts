import { DomainEvent } from './DomainEvent';

export class DomainEventPublisher {
  private static handlers: {
    [eventName: string]: ((event: DomainEvent) => void)[];
  } = {};

  static publish(event: DomainEvent): void {
    const eventName = event.constructor.name;
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach((handler) => handler(event));
    }
  }

  static subscribe(
    eventName: string,
    handler: (event: DomainEvent) => void,
  ): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }
}
