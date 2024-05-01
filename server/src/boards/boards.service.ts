import { Injectable } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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

  async createBoard(data: Board) {
    return this.prisma.board.create({ data });
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