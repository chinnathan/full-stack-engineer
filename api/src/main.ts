import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setting up a reverse proxy server with nginx later
  app.enableCors(); // temporally enable cors
  await app.listen(3001);
}
bootstrap();
