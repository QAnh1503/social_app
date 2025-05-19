import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Answer from 'src/entities/Answer';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answersRepository: Repository<Answer>,
    ) {}
    findAll() {
        return this.answersRepository.find();
    }
    findOne(idAns: number) {
        return this.answersRepository.findOneBy({ idAns });
    }
    findMany(idQues: number) {
        return this.answersRepository.find({
        where: { idQues },
        order: { created_at: 'DESC' },
        });
    }
    create(ansData: Partial<Answer>) {
            const ans = this.answersRepository.create(ansData);
            ans.created_at = new Date();
            return this.answersRepository.save(ans);
    }
    async delete(idAns: number) {
        const ans = await this.answersRepository.findOneBy({ idAns });
        await this.answersRepository.delete(idAns);
        return ans;
    }
}
