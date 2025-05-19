import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions')
export default class Question {
    @PrimaryGeneratedColumn()
    idQues: number;

    @Column()
    question: string;

    @Column()
    idUser: number;  
    
    @Column()
    tags: string;

    @Column()
    created_at: Date;

}