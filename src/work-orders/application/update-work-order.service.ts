import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';
import { GetUserService } from '../../users/application/get-user.service';
import { WorkOrder } from '../domain/work-order';

@Injectable()
export class UpdateWorkOrderService {
    constructor(
        @Inject(WORK_ORDER_REPOSITORY)
        private workOrderRepository: WorkOrderRepository,
        private getUserService: GetUserService,
    ) { }

    async execute(
        id: string,
        description: string,
        status: string,
        assignedUserId: string,
    ): Promise<void> {
        const workOrder = await this.workOrderRepository.findById(id);
        if (!workOrder) {
            throw new NotFoundException('WorkOrder not found');
        }

        const assignedUser = await this.getUserService.execute(assignedUserId);
        if (!assignedUser) {
            throw new NotFoundException('User not found');
        }

        workOrder.description = description;
        workOrder.status = status;
        workOrder.assignedUser = assignedUser;
        workOrder.updatedAt = new Date();
        await this.workOrderRepository.update(workOrder);
    }
}