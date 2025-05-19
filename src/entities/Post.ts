import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export default class Post {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column({default: 0})
    likes: number;

    @Column({default: 0})
    number_of_comments: number;

    @Column({default: "description here"})
    description: string;

    @Column({default: "Food, Drink"})
    tags: string;

    @Column({default: ""})
    image: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column({default: 0})
    idUser: number;
}