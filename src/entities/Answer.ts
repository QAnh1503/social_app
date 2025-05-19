import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('answers')
export default class Answer {
    @PrimaryGeneratedColumn()
    idAns: number;

    @Column()
    answer: string;

    @Column()
    idUser: number;  
    
    @Column()
    idQues: number;  

    @Column()
    created_at: Date;
}