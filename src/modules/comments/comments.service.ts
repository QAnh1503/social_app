import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from 'src/entities/Comment';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
            @InjectRepository(Comment)
            private readonly commentsRepository: Repository<Comment>,
        ) {}
        findAll() {
            return this.commentsRepository.find();
        }
    
        findOne(idComment: number) {
            return this.commentsRepository.findOneBy({ idComment });
        }
        findMany(idPost: number) {
            return this.commentsRepository.find({
                where: { idPost },
                order: { created_at: 'DESC' } // tuỳ chọn: sắp xếp theo thời gian nếu cần
            });
        }
    
        create(commentData: Partial<Comment>) {
            const comment = this.commentsRepository.create(commentData);
            comment.created_at = new Date();
            return this.commentsRepository.save(comment);
        }
    
        async delete(idComment: number) {
            const comment = await this.commentsRepository.findOneBy({ idComment });
            await this.commentsRepository.delete(idComment);
            return comment;
        }
}
