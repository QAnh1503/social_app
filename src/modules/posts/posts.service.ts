import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from 'src/entities/Post';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}
    findAll() {
        return this.postsRepository.find();
    }

    // findOne(id: number) {
    //     return this.usersRepository.findOneBy({id});
    // }
    // findOne(email: string) {
    //     return this.postsRepository.findOneBy({ email });
    // }
    findOne(idPost: number) {
        return this.postsRepository.findOneBy({ idPost });
    }
    // async findByEmail(email: string): Promise<Post | null> {
    //     return this.postsRepository.findOne({ where: { email } });
    // }

    async findManyByIdUser(idUser: number) {
    return this.postsRepository.find({
        where: { idUser },
        order: { created_at: 'DESC' } // Tuỳ chọn: sắp xếp mới nhất trước
    });
    }

    create(postData: Partial<Post>) {
        const post = this.postsRepository.create(postData);
        post.created_at = new Date();
        post.updated_at = new Date();
        return this.postsRepository.save(post);
    }

    async update(idPost: number, userData: Partial<Post>) {
        userData.updated_at = new Date();
        await this.postsRepository.update(idPost, userData);
        return this.postsRepository.findOneBy({ idPost });
    }

    async delete(idPost: number) {
        const user = await this.postsRepository.findOneBy({ idPost });
        await this.postsRepository.delete(idPost);
        return user;
    }
}
