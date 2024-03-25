import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTaskById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        status: true,
      }
    });

    if (!task) {
      throw new NotFoundException('Task not found!');
    }

    return task;
  }

  async getTasks() {
    return this.prisma.task.findMany();
  }

  async createTask(data: Task) {
    return this.prisma.task.create({ data });
  }

  async deleteTask(id: number) {
    await this.getTaskById(id);

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async deleteTasksMany(statusId: number) {
    return this.prisma.task.deleteMany({ where: {
      statusId,
    }})
  }

  async updateTask(id: number, data) {
    await this.getTaskById(id);

    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }
}
