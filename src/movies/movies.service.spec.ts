import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트하기 전에 실행됨
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      // result가 배열인지 확인
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // 테스트를 위해 데이터를 먼저 생성
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // movie 정의 여부 확인
      expect(movie.id).toEqual(1); // id가 1인지 확인
    });

    // 예외처리가 발생하는 지 확인
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); // 예외처리
        expect(e.message).toEqual('Movie with Id 999 not found'); // 메시지
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1); // id가 1인 데이터 삭제

      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete); // 삭제 후 데이터 길이 확인
    });

    // 예외처리가 발생하는 지 확인
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); // 예외처리
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate); // 생성 후 데이터 길이 확인
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      // 매번 테스트를 위해 데이터를 작성하지 않고 beforeEach에서 데이터를 넣도록 작성할 수도 있음
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' }); // id가 1인 데이터의 title을 변경
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test'); // 변경된 title 확인
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {}); // id가 999인 데이터를 업데이트
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); // 예외처리
      }
    });
  });
});
