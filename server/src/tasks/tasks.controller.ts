import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.tasksService.getTaskById(+id);
  }

  @Get()
  async getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  async createTask(@Body() taskInfo: Task) {
    return this.tasksService.createTask(taskInfo);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() infoToUpdate) {
    return this.tasksService.updateTask(+id, infoToUpdate);
  }
}
