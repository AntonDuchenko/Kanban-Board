import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':userId')
  async getBoards(@Param('userId') userId: string) {
    return this.boardsService.getBoardsByUserId(+userId);
  }

  @Post()
  async createBoard(@Body() boardInfo: CreateBoardDto) {
    return this.boardsService.createBoard(boardInfo);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(+id);
  }

  @Patch(':id')
  async updateBoard(@Param('id') id: string, @Body() newtitle: string) {
    return this.boardsService.updateBoard(+id, newtitle);
  }
}
