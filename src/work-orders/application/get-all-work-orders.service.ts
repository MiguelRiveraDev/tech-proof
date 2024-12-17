import { Injectable, Inject } from '@nestjs/common';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';
import { WorkOrder } from '../domain/work-order';

@Injectable()
export class GetAllWorkOrdersService {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private workOrderRepository: WorkOrderRepository,
  ) {}

  async execute(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.findAll();
  }
}