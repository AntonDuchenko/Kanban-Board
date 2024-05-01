import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { PrismaService } from './prisma.service';
import { StatusesService } from './statuses/statuses.service';
import { StatusesController } from './statuses/statuses.controller';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';

@Module({
  controllers: [
    TasksController,
    StatusesController,
    HistoryController,
    BoardsController,
  ],
  providers: [
    PrismaService,
    TasksService,
    StatusesService,
    HistoryService,
    BoardsService,
  ],
})
export class AppModule {}
