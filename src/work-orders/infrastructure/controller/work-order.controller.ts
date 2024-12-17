import { Controller, Get, Put, Delete, Post, Param, Body } from '@nestjs/common';
import { WorkOrderService } from '../../application/work-order.service';

@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get()
  async findAll() {
    return await this.workOrderService.getAllWorkOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workOrderService.getWorkOrderById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWorkOrderDto: any) {
    return await this.workOrderService.updateWorkOrder(
      id,
      updateWorkOrderDto.description,
      updateWorkOrderDto.status,
      updateWorkOrderDto.assignedUser,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workOrderService.deleteWorkOrder(id);
  }

  @Post()
  async run(@Body() createWorkOrderDto: any) {
    return await this.workOrderService.createWorkOrder(
      createWorkOrderDto.description,
      createWorkOrderDto.status,
      createWorkOrderDto.assignedUser,
    );
  }
}
