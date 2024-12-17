import { Controller, Get, Put, Delete, Post, Param, Body } from '@nestjs/common';
import { CreateWorkOrderService } from '../application/create-work-order.service';
import { GetWorkOrderByUserIdService } from '../application/get-work-order-by-user-id.service';
import { GetAllWorkOrdersService } from '../application/get-all-work-orders.service';
import { UpdateWorkOrderService } from '../application/update-work-order.service';
import { DeleteWorkOrderService } from '../application/delete-work-order.service';

@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private readonly createWorkOrderService: CreateWorkOrderService,
    private readonly getWorkOrderByUserIdService: GetWorkOrderByUserIdService,
    private readonly getAllWorkOrdersService: GetAllWorkOrdersService,
    private readonly updateWorkOrderService: UpdateWorkOrderService,
    private readonly deleteWorkOrderService: DeleteWorkOrderService,
  ) {}

  @Get()
  async findAll() {
    return await this.getAllWorkOrdersService.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getWorkOrderByUserIdService.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWorkOrderDto: any) {
    return await this.updateWorkOrderService.execute(
      id,
      updateWorkOrderDto.description,
      updateWorkOrderDto.status,
      updateWorkOrderDto.assignedUser,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteWorkOrderService.execute(id);
  }

  @Post()
  async run(@Body() createWorkOrderDto: any) {
    return await this.createWorkOrderService.execute(
      createWorkOrderDto.description,
      createWorkOrderDto.status,
      createWorkOrderDto.assignedUser,
    );
  }
}