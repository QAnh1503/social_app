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
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

    @Get()
    findAll() {
      return this.commentsService.findAll();
    }

    // @Get(':idComment')
    // async findOne(@Param('idComment') idComment: number) {
    //   const post = await this.commentsService.findOne(idComment);
    //   if (!post) {
    //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return post;
    // }

    @Get(':idPost')
    async findManyCmtWithIdPost(@Param('idPost') idPost: number) {
      const post = await this.commentsService.findMany(idPost);
      if (!post) {
        throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      }
      return post;
    }

    @Post('comment')
    create(@Body() commentData) {
      return this.commentsService.create(commentData);
    }

    @Delete(':idComment')
    async delete(@Param('idComment') idComment: number) {
      const comment = await this.commentsService.findOne(idComment);
      if (!comment) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return this.commentsService.delete(idComment);
    }
}
