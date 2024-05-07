/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusesService } from 'src/statuses/statuses.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async getBoards() {
    return this.prisma.board.findMany();
  }

  async getBoardById(id: number) {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }

  async createBoard(title: string) {
    return this.prisma.board.create({ data: { title } });
  }

  async deleteBoard(id: number) {
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
