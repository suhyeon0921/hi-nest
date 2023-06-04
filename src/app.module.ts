import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// 데코레이터 : 클래스에 함수 기능을 추가할 수 있음
// 클래스 위 함수(아이스크림 위 초콜릿같은)
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
