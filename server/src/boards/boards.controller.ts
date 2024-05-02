import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string){
    return this.boardsService.getBoardById(+id);
  }

  @Post()
  async createBoard(@Body() boardInfo: string){
    return this.boardsService.createBoard(boardInfo);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string){
    return this.boardsService.deleteBoard(+id);
  }

  @Patch(':id')
  async updateBoard(@Param('id') id: string, @Body() newtitle: string){
    return this.boardsService.updateBoard(+id, newtitle);
  }
}