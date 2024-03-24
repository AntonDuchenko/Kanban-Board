import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.status.findMany();
  }

  async createStatus(data: Status) {
    return this.prisma.status.create({ data });
  }

  async deleteStatus(id: number) {
    await this.getStatusById(id);

    return this.prisma.status.delete({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: number, data) {
    await this.getStatusById(id);

    return this.prisma.status.update({
      where: {
        id,
      },
      data,
    });
  }
}
