import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/moive.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('영화 API')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  @ApiOperation({ summary: '영화 목록 API' })
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: '영화 1개 조회 API' })
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  @ApiOperation({ summary: '영화 생성 API' })
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '영화 삭제 API' })
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: '영화 수정 API' })
  path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }
}
