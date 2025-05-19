import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Story from 'src/entities/Story';

@Module({
  controllers: [StoriesController],
  providers: [StoriesService],
  imports: [TypeOrmModule.forFeature([Story])],
})
export class StoriesModule {}
