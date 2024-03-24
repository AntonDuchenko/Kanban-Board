import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { PrismaService } from './prisma.service';
import { StatusesService } from './statuses/statuses.service';
import { StatusesController } from './statuses/statuses.controller';

@Module({
  controllers: [TasksController, StatusesController],
  providers: [PrismaService, TasksService, StatusesService],
})
export class AppModule {}
