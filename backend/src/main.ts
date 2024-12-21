import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { Options } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.createMicroservice<MicroserviceOptions(
    AppModule, 
    { abortOnError: false, 
      transport : Transport.gRPC,
      options : {
        package : 'hero',
        protoPath : join(__dirname, 'hero/hero.proto'),
      }
    });

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
