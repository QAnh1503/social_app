import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Follower from 'src/entities/Follower';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService],
  imports: [TypeOrmModule.forFeature([Follower])],
})
export class FollowersModule {}
