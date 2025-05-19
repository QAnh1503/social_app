import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Following from 'src/entities/Following';

@Module({
  controllers: [FollowingController],
  providers: [FollowingService],
  imports: [TypeOrmModule.forFeature([Following])],
})
export class FollowingModule {}
