import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';

@Injectable()
export class DeleteWorkOrderService {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private workOrderRepository: WorkOrderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const workOrder = await this.workOrderRepository.findById(id);
    if (!workOrder) {
      throw new NotFoundException('WorkOrder not found');
    }
    await this.workOrderRepository.delete(id);
  }
}