/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class StatusesService {
  constructor(
    private readonly TasksService: TasksService,
    private prisma: PrismaService,
  ) {}

  async getStatusById(id: number) {
    const status = await this.prisma.status.findUnique({
      where: {
        id,
      },
    });

    if (!status) {
      throw new NotFoundException('Status not found!');
    }

    return status;
  }

  async getStatuses() {
    return this.prisma.status.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        title: 'desc',
      },
    });
  }

  async createStatus(data: Status) {
    return this.prisma.status.create({ data });
  }

  async deleteStatus(id: number) {
    await this.TasksService.deleteTasksMany(id);
    await this.getStatusById(id);

    return this.prisma.status.delete({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: number, data) {
    await this.getStatusById(id);

    return await this.prisma.status.update({
      where: {
        id,
      },
      data,
    });
  }
}
