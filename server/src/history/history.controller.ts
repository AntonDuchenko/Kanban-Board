import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { History } from '@prisma/client';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.historyService.getHistoriesById(+id);
  }

  @Get()
  async getStatuses() {
    return this.historyService.getHistoryes();
  }

  @Post(':id')
  async createStatus(@Param('id') taskId: string, @Body() historyAction: History) {
    return this.historyService.createHistory(+taskId, historyAction);
  }
}
