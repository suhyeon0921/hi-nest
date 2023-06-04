import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'src/util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  // 유효성 검사
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 이상한 데이터 요청 거름
      forbidNonWhitelisted: true, // 이상한 요소에 대한 메세지 반환
      transform: true, // 타입 변경해 줌(디폴트로 string인데 우리가 설정한 number로 변경)
    }),
  );
  await app.listen(3000);
}
bootstrap();
