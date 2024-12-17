import { Injectable } from '@nestjs/common';
import { WorkOrder } from '../../domain/work-order';
import { WorkOrderRepository } from '../../domain/work-order-repository';

@Injectable()
export class InMemoryWorkOrderRepository implements WorkOrderRepository {
  private workOrders: Map<string, WorkOrder> = new Map();

  async save(workOrder: WorkOrder): Promise<void> {
    this.workOrders.set(workOrder.id, workOrder);
  }

  async findById(id: string): Promise<WorkOrder | null> {
    return this.workOrders.get(id) || null;
  }

  async findAll(): Promise<WorkOrder[]> {
    return Array.from(this.workOrders.values());
  }

  async update(workOrder: WorkOrder): Promise<void> {
    if (!this.workOrders.has(workOrder.id)) {
      throw new Error('WorkOrder not found');
    }
    this.workOrders.set(workOrder.id, workOrder);
  }

  async delete(id: string): Promise<void> {
    this.workOrders.delete(id);
  }
  async findByUserId(userId: string): Promise<WorkOrder[]> {
    return Array.from(this.workOrders.values()).filter(
      (workOrder) => workOrder.assignedUser.id === userId,
    );
  }
}
