import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Answer from 'src/entities/Answer';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
   imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule {}
