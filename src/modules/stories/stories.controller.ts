import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) {}

    @Get()
    findAll() {
      return this.storiesService.findAll();
    }

    @Get(':idStory')
    async findOne(@Param('idStory') idStory: number) {
      const post = await this.storiesService.findOne(idStory);
      if (!post) {
        throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      }
      return post;
    }

    @Post('story')
    create(@Body() storyData) {
      return this.storiesService.create(storyData);
    }

    @Delete(':idStory')
    async delete(@Param('idStory') idStory: number) {
      const story = await this.storiesService.findOne(idStory);
      if (!story) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return this.storiesService.delete(idStory);
    }
}
