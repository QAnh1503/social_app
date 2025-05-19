import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('stories')
export default class Story {
    @PrimaryGeneratedColumn()
    idStory: number;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column()
    created_at: Date;

    @Column()
    idUser: number;    
}