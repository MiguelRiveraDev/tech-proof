
import { DomainEvent } from '../../shared/domain/DomainEvent';
import { WorkOrder } from './work-order';

export class WorkOrderCreatedEvent extends DomainEvent {
  constructor(public readonly user: WorkOrder) {
    super();
  }
}
