import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':tags')
  async findManyAnsWithIdQues(@Param('tags') tags: string) {
    const questions = await this.questionService.findMany(tags);
    if (!questions) {
      throw new HttpException('Answers does not exist.', HttpStatus.NOT_FOUND);
    }
    return questions;
  }

  @Post('question')
  create(@Body() questionData) {
    return this.questionService.create(questionData);
  }

  @Delete(':idQues')
  async delete(@Param('idQues') idQues: number) {
    const question = await this.questionService.findOne(idQues);
    if (!question) {
      throw new HttpException('Question does not exist.', HttpStatus.NOT_FOUND);
    }
    return this.questionService.delete(idQues);
  }
}
