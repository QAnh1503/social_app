import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Story from 'src/entities/Story';
import { Repository } from 'typeorm';

@Injectable()
export class StoriesService {
    constructor(
        @InjectRepository(Story)
        private readonly storiesRepository: Repository<Story>,
    ) {}
    findAll() {
        return this.storiesRepository.find();
    }

    findOne(idStory: number) {
        return this.storiesRepository.findOneBy({ idStory });
    }

    create(storyData: Partial<Story>) {
        const story = this.storiesRepository.create(storyData);
        story.created_at = new Date();
        return this.storiesRepository.save(story);
    }

    async delete(idStory: number) {
        const story = await this.storiesRepository.findOneBy({ idStory });
        await this.storiesRepository.delete(idStory);
        return story;
    }
}
