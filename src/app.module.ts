import { Module } from '@nestjs/common';
import { UserModule } from './users/infrastructure/users.module';
import { WorkOrdersModule } from './work-orders/infrastructure/work-orders.module';

@Module({
  imports: [UserModule, WorkOrdersModule],
})
export class AppModule {}