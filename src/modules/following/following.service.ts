import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Following from 'src/entities/Following';

@Injectable()
export class FollowingService {
    constructor(
        @InjectRepository(Following)
        private readonly followingRepository: Repository<Following>,
    ) {}
    findAll() {
        return this.followingRepository.find();
    }

    findOne(idUserFollowing: number) {
        return this.followingRepository.findOneBy({ idUserFollowing });
    }
    async findOneByUsers(idUser: number, idUserFollowing: number) {
        return await this.followingRepository.findOneBy({ idUser, idUserFollowing });
    }

    findMany(idUser: number) {
        return this.followingRepository.find({
            where: { idUser },
            order: { nameUserFollowing: 'ASC' } 
        });
    }

    async exists(idUser: number, idUserFollowing: number): Promise<boolean> {
        const following = await this.followingRepository.findOneBy({ idUser, idUserFollowing });
        return !!following;
    }

    create(followingData: Partial<Following>) {
        const follwing = this.followingRepository.create(followingData);
        return this.followingRepository.save(follwing);
    }

    async delete(idFollowing: number) {
        const follwing = await this.followingRepository.findOneBy({ idFollowing });
        await this.followingRepository.delete(idFollowing);
        return follwing;
    }
}
