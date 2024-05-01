/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { StatusesService } from 'src/statuses/statuses.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly StatusesService: StatusesService,
    private prisma: PrismaService) {}

  async getBoards() {
    return this.prisma.board.findMany({
      include: {
        statuses: true,
      },
    });
  }

  async getBoardById(id: number) {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
      include: {
        statuses: true,
      },
    });
  }

  async createBoard(data: Board) {
    return this.prisma.board.create({ data });
  }

  async deleteBoard(id: number) {
    await this.StatusesService.deleteStatusesMany(id);
    return this.prisma.board.delete({
      where: {
        id,
      },
    });
  }

  async updateBoard(id: number, newtitle: string) {
    return this.prisma.board.update({
      where: {
        id,
      },
      data: {
        title: newtitle,
      },
    });
  }
}