import { Module } from '@nestjs/common';
import { WorkOrderController } from './infrastructure/controller/work-order.controller';
import { WorkOrderService } from './application/work-order.service';
import { InMemoryWorkOrderRepository } from './infrastructure/repository/in-memory-work-order-repository';
import { WORK_ORDER_REPOSITORY } from './work-order.constants';
import { UserModule } from '../users/users.module';
import { GetOrderByUserIdService } from './application/get-order-by-user-id.service';

@Module({
  imports: [UserModule],
  controllers: [WorkOrderController],
  providers: [
    WorkOrderService,
    GetOrderByUserIdService,
    { provide: WORK_ORDER_REPOSITORY, useClass: InMemoryWorkOrderRepository },
  ],
})
export class WorkOrdersModule {}
