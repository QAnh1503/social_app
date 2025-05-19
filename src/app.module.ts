import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { StoriesModule } from './modules/stories/stories.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FollowersModule } from './modules/followers/followers.module';
import { FollowingModule } from './modules/following/following.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import Product from './entities/Product';
import User from './entities/User';
import Post from './entities/Post';
import Story from './entities/Story';
import Comment from './entities/Comment';
import Follower from './entities/Follower';
import Following from './entities/Following';
import Answer from './entities/Answer';
import Question from './entities/Question';

@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'test',
      entities: [Product, User, Post, Story, Comment, Follower, Following, Answer, Question], // Dsach các entity sẽ ánh xạ
      synchronize: true,  // Tự động tạo bảng từ entity ( chỉ dùng trong development)
    }),
    ProductsModule,
    UsersModule,
    PostsModule,
    StoriesModule,
    CommentsModule,
    FollowersModule,
    FollowingModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
