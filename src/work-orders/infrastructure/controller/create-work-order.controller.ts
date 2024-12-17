import { Controller, Post, Body, Inject } from '@nestjs/common';
import { WorkOrderRepository } from '../../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../../work-order.constants';
import { WorkOrder } from '../../domain/work-order';
import { GetUserService } from '../../../users/application/get-user.service';

@Controller('work-orders')
export class WorkOrderController {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private readonly workOrderRepository: WorkOrderRepository,
    private getUserService: GetUserService,
  ) {}

  @Post()
  async run(@Body() createWorkOrderDto: any) {
    const assignedUser = await this.getUserService.execute(
      createWorkOrderDto.assignedUserId,
    );
    const workOrder = new WorkOrder(
      Math.random().toString(36).substring(2),
      createWorkOrderDto.description,
      createWorkOrderDto.status,
      new Date(),
      new Date(),
      assignedUser,
    );
    return await this.workOrderRepository.save(workOrder);
  }
}
