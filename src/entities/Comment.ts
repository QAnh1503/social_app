import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export default class Comment {
    @PrimaryGeneratedColumn()
    idComment: number;

    @Column()
    comment: string;

    @Column()
    created_at: Date;

    @Column()
    idPost: number; 

    @Column()
    idUser: number;    
}