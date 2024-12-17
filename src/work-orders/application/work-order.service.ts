import { Inject, Injectable } from '@nestjs/common';
import { WorkOrder } from '../domain/work-order';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';
import { GetUserService } from '../../users/application/get-user.service';

@Injectable()
export class WorkOrderService {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private workOrderRepository: WorkOrderRepository,
    private getUserService: GetUserService,
  ) {}

  async createWorkOrder(
    description: string,
    status: string,
    assignedUserId: string,
  ): Promise<WorkOrder> {
    if (!description && description?.trim() === '') {
      throw new Error('Description are required');
    }

    if (!status && status?.trim() === '') {
      throw new Error('Status are required');
    }

    if (!assignedUserId && assignedUserId?.trim() === '') {
      throw new Error('Assigned user are required');
    }

    const assignedUser = await this.getUserService.execute(assignedUserId);
    if (!assignedUser) {
      throw new Error('User not found');
    }

    const workOrder = new WorkOrder(
      Math.random().toString(36).substring(2),
      description,
      status,
      new Date(),
      new Date(),
      assignedUser,
    );
    await this.workOrderRepository.save(workOrder);
    return workOrder;
  }

  async getWorkOrderById(id: string): Promise<WorkOrder | null> {
    return await this.workOrderRepository.findById(id);
  }

  async getAllWorkOrders(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.findAll();
  }

  async updateWorkOrder(
    id: string,
    description: string,
    status: string,
    assignedUserId: string,
  ): Promise<void> {
    const workOrder = await this.workOrderRepository.findById(id);
    if (!workOrder) {
      throw new Error('WorkOrder not found');
    }
    const assignedUser = await this.getUserService.execute(assignedUserId);
    workOrder.description = description;
    workOrder.status = status;
    workOrder.assignedUser = assignedUser;
    workOrder.updatedAt = new Date();
    await this.workOrderRepository.update(workOrder);
  }

  async deleteWorkOrder(id: string): Promise<void> {
    await this.workOrderRepository.delete(id);
  }
}
