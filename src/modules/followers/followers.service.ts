import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Follower from 'src/entities/Follower';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
    constructor(
        @InjectRepository(Follower)
        private readonly followersRepository: Repository<Follower>,
    ) {}
    findAll() {
        return this.followersRepository.find();
    }

    findOne(idUserFollower: number) {
        return this.followersRepository.findOneBy({ idUserFollower });
    }

    findOneIdFollower(idFollower: number) {
        return this.followersRepository.findOneBy({ idFollower });
    }

    async findOneByUsers(idUser: number, idUserFollower: number) {
        return await this.followersRepository.findOneBy({ idUser, idUserFollower });
    }

    findMany(idUser: number) {
        return this.followersRepository.find({
            where: { idUser },
            order: { nameUserFollower: 'ASC' } 
        });
    }

    async exists(idUser: number, idUserFollower: number): Promise<boolean> {
        const follower = await this.followersRepository.findOneBy({ idUser, idUserFollower });
        return !!follower;
    }

    create(followerData: Partial<Follower>) {
        const follwer = this.followersRepository.create(followerData);
        return this.followersRepository.save(follwer);
    }

    async delete(idFollower: number) {
        const follwer = await this.followersRepository.findOneBy({ idFollower });
        await this.followersRepository.delete(idFollower);
        return follwer;
    }
}
