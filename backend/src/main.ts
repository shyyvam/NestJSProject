import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
