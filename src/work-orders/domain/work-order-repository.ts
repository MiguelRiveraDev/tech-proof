import { WorkOrder } from './work-order';

export interface WorkOrderRepository {
  save(workOrder: WorkOrder): Promise<void>;
  findById(id: string): Promise<WorkOrder | null>;
  findByUserId(userId: string): Promise<WorkOrder[]>;
  findAll(): Promise<WorkOrder[]>;
  update(workOrder: WorkOrder): Promise<void>;
  delete(id: string): Promise<void>;
}
