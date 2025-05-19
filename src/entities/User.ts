import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    website: string;

    @Column()
    bio: string;

    @Column()
    phone: string;

    @Column()
    gender: string;

    @Column({default: 0})
    following: number;

    @Column({default: 0})
    followers: number;

    @Column({default: 0})
    posts: number;

    @Column({default: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FVibeLap-9dd5ccb5-1e55-4082-984d-e4a3f450ca0d/ImagePicker/6f3a578c-fc46-461a-9fdd-7c85871efee4.jpeg"})
    avatar: string;
    
    @Column({ default: true})
    isActive: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}