import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // AppModule 생성
  const app = await NestFactory.create(AppModule);

  // 유효성 검사를 하겠다.
  app.useGlobalPipes(new ValidationPipe()); // 해당 코드 추가!
  await app.listen(3306);
}
bootstrap();
