import { Injectable, Inject } from '@nestjs/common';
import { WorkOrderRepository } from '../domain/work-order-repository';
import { WORK_ORDER_REPOSITORY } from '../work-order.constants';
import { UserRepository } from '../../users/domain/user-repository';
import { USER_REPOSITORY } from '../../users/users.constants';
import { WorkOrder } from '../domain/work-order';

@Injectable()
export class GetWorkOrderByUserIdService {
  constructor(
    @Inject(WORK_ORDER_REPOSITORY)
    private workOrderRepository: WorkOrderRepository,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) { }

  async execute(assignedUserId: string): Promise<WorkOrder[]> {
    const assignedUser = await this.userRepository.findById(assignedUserId);
    if (!assignedUser) {
      throw new Error('User not found');
    }
    const workOrders = this.workOrderRepository.findByUserId(assignedUserId);
    return workOrders;
  }
}
