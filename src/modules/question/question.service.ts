import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Question from 'src/entities/Question';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    constructor(
      @InjectRepository(Question)
      private readonly questionRepository: Repository<Question>,
    ) {}
    findAll() {
      return this.questionRepository.find();
    }
    findOne(idQues: number) {
      return this.questionRepository.findOneBy({ idQues });
    }
    findMany(tags: string) {
      return this.questionRepository.find({
        where: { tags },
        order: { created_at: 'DESC' },
      });
    }
    create(quesData: Partial<Question>) {
      const ques = this.questionRepository.create(quesData);
      ques.created_at = new Date();
      return this.questionRepository.save(ques);
    }
    async delete(idQues: number) {
      const ques = await this.questionRepository.findOneBy({ idQues });
      await this.questionRepository.delete(idQues);
      return ques;
    }
}
