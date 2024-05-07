/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { History } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async getHistoriesById(id: number) {
    const history = await this.prisma.history.findMany({
      where: {
        taskId: id,
      },
      orderBy: {
        createAt: 'asc',
      },
    });

    return history;
  }

  async getHistoryes() {
    return this.prisma.history.findMany({
      orderBy: {
        createAt: 'asc',
      },
    });
  }

  async createHistory(taskId: number, data: Omit<History, 'taskId'>) {
    return this.prisma.history.create({
      data: {
        ...data,
        taskId,
      }
    });
  }
}
