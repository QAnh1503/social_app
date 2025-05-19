import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Question from 'src/entities/Question';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
   imports: [TypeOrmModule.forFeature([Question])],
})
export class QuestionModule {}
