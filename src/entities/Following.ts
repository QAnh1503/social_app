import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('following')
export default class Following {
    @PrimaryGeneratedColumn()
    idFollowing: number;

    @Column()
    idUserFollowing: number;  

    @Column()
    nameUserFollowing: string;

    @Column()
    idUser: number;    
}