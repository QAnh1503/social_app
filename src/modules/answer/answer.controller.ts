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
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Get()
    findAll() {
      return this.answerService.findAll();
    }


    @Get(':idQues')
    async findManyAnsWithIdQues(@Param('idQues') idQues: number) {
      const answers = await this.answerService.findMany(idQues);
      if (!answers) {
        throw new HttpException('Answers does not exist.', HttpStatus.NOT_FOUND);
      }
      return answers;
    }

    @Post('answer')
    create(@Body() answerData) {
      return this.answerService.create(answerData);
    }


    @Delete(':idAns')
    async delete(@Param('idAns') idAns: number) {
      const answer = await this.answerService.findOne(idAns);
      if (!answer) {
        throw new HttpException('Answer does not exist.', HttpStatus.NOT_FOUND);
      }
      return this.answerService.delete(idAns);
    }
}
