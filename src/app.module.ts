import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';

@Module({
  imports: [UserModule, WorkOrdersModule],
})
export class AppModule {}