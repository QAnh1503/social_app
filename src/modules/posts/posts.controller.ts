import { PostsService } from './posts.service';
import {  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
    
      @Get()
      findAll() {
        return this.postsService.findAll();
      }
    
      // @Get('idPost/:idPost') 
      // async findOne(@Param('idPost') idPost: number) {
      //   const post= await this.postsService.findOne(idPost);
      //   if (!post) {
      //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      //   }
      //   return post;
      // }
      
      // @Get(':email') 
      // async findOne(@Param('email') email: string) {
      //   const post= await this.postsService.findOne(email);
      //   if (!post) {
      //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      //   }
      //   return post;
      // }
      @Get('idUser/:idUser') 
      async findManyByIdUser(@Param('idUser') idUser: number) {
        const posts = await this.postsService.findManyByIdUser(idUser);
        if (!posts || posts.length === 0) {
          throw new HttpException('No posts found for this user.', HttpStatus.NOT_FOUND);
        }
        return posts;
      }
    
      @Post('post') 
      create (@Body() postData: CreatePostDto ) {
        return this.postsService.create(postData);
      }
    
      @Patch(':idPost') 
      update (@Body() postData: UpdatePostDto, @Param('idPost') idPost: number ) {
        return this.postsService.update(idPost, postData);
      }
    
      @Delete(':idPost')
      async delete (@Param('idPost') idPost: number) {
        const user= await this.postsService.findOne(idPost);
        if (!user) {
          throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
        }
        return this.postsService.delete(idPost);;
      }
      
}
