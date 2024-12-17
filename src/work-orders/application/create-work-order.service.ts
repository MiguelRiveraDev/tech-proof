import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';
import { GetUserService } from '../../users/application/get-user.service';
import { WorkOrder } from '../domain/work-order';

@Injectable()
export class CreateWorkOrderService {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private workOrderRepository: WorkOrderRepository,
    private getUserService: GetUserService,
  ) {}

  async execute(
    description: string,
    status: string,
    assignedUserId: string,
  ): Promise<WorkOrder> {
    if (!description || description.trim() === '') {
      throw new Error('Description is required');
    }

    if (!status || status.trim() === '') {
      throw new Error('Status is required');
    }

    if (!assignedUserId || assignedUserId.trim() === '') {
      throw new Error('Assigned user is required');
    }

    const assignedUser = await this.getUserService.execute(assignedUserId);
    if (!assignedUser) {
      throw new NotFoundException('User not found');
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
}