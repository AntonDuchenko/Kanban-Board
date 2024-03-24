import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function createServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}

createServer();
