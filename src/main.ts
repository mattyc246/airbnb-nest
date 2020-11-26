import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: "http://localhost:3001",
    credentials: true
  })
  await app.listen(3000);
}

bootstrap();
