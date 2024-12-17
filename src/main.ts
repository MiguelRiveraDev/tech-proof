import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as NestLogger } from '@nestjs/common';
import { EventLogger } from './shared/infrastructure/EventLogger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  NestLogger.log('🚀 Application is running on: http://localhost:3000');
  new EventLogger();
}
bootstrap();
