import { DomainEventPublisher } from '../../shared/domain/DomainEventPublisher';
import { User } from '../../users/domain/User';
import { WorkOrderCreatedEvent } from './work-order-created-event';

export class WorkOrder {
  constructor(
    public id: string,
    public description: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
    public assignedUser: User,
  ) {}

  static create(description: string, status: string, assignedUser): WorkOrder {
    const workOrder = new WorkOrder(
      Math.random().toString(36).substring(2),
      description,
      status,
      new Date(),
      new Date(),
      assignedUser,
    );
    DomainEventPublisher.publish(new WorkOrderCreatedEvent(workOrder));
    return workOrder;
  }

}
