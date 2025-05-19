import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('followers')
export default class Follower {
    @PrimaryGeneratedColumn()
    idFollower: number;

    @Column()
    idUserFollower: number;  

    @Column()
    nameUserFollower: string;

    @Column()
    idUser: number;    
}