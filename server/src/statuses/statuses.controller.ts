import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { Status } from '@prisma/client';

@Controller('api/statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.statusesService.getStatusById(+id);
  }

  @Get()
  async getStatuses() {
    return this.statusesService.getStatuses();
  }

  @Post()
  async createStatus(@Body() taskInfo: Status) {
    return this.statusesService.createStatus(taskInfo);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.statusesService.deleteStatus(+id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() infoToUpdate) {
    return this.statusesService.updateStatus(+id, infoToUpdate);
  }
}
