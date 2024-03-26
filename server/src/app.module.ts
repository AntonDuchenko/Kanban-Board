import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { PrismaService } from './prisma.service';
import { StatusesService } from './statuses/statuses.service';
import { StatusesController } from './statuses/statuses.controller';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';

@Module({
  controllers: [TasksController, StatusesController, HistoryController],
  providers: [PrismaService, TasksService, StatusesService, HistoryService],
})
export class AppModule {}
