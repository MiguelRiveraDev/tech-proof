import { Module } from '@nestjs/common';
import { CreateWorkOrderService } from './application/create-work-order.service';
import { GetWorkOrderByUserIdService } from './application/get-work-order-by-user-id.service';
import { GetAllWorkOrdersService } from './application/get-all-work-orders.service';
import { UpdateWorkOrderService } from './application/update-work-order.service';
import { DeleteWorkOrderService } from './application/delete-work-order.service';
import { WorkOrderController } from './infrastructure/controller/work-order.controller';
import { WORK_ORDER_REPOSITORY } from './work-order.constants';
import { InMemoryWorkOrderRepository } from './infrastructure/repository/in-memory-work-order-repository';
import { GetUserService } from '../users/application/get-user.service';
import { USER_REPOSITORY } from '../users/users.constants';
import { InMemoryUserRepository } from '../users/infrastructure/InMemoryUserRepository';

@Module({
  controllers: [WorkOrderController],
  providers: [
    CreateWorkOrderService,
    GetWorkOrderByUserIdService,
    GetAllWorkOrdersService,
    UpdateWorkOrderService,
    DeleteWorkOrderService,
    {
      provide: WORK_ORDER_REPOSITORY,
      useClass: InMemoryWorkOrderRepository,
    },
    GetUserService,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class WorkOrdersModule {}