import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { StatusesModule } from './statuses/statuses.module';
import { PrismaModule } from './prisma/prisma.module';
import { HistoryModule } from './history/history.module';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, StatusesModule, PrismaModule, HistoryModule, BoardsModule, UsersModule, AuthModule],
})
export class AppModule {}
