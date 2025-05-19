import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private readonly usersRepository: Repository<User>
        ) {}
    
        findAll() {
            return this.usersRepository.find();
        }
    
        findById(idUser: number) {
            return this.usersRepository.findOneBy({idUser});
        }
        // async findById(idUser: number): Promise<User | null> {
        //     return this.usersRepository.findOne({ where: { idUser } });
        // }

        //     findOne(id: number) {
        //     return this.productsRepository.findOneBy({id});
        // }
        findOne(email: string) {
            return this.usersRepository.findOneBy({email});
        }
        async findByEmail(email: string): Promise<User | null> {
            return this.usersRepository.findOne({ where: { email } });
        }
    
        create(userData: Partial<User>) {
            const user= this.usersRepository.create(userData);
            user.created_at = new Date();
            user.updated_at= new Date();
            return this.usersRepository.save(user);
        }
    
        async update(idUser: number, userData: Partial<User>) {
            userData.updated_at= new Date();
            await this.usersRepository.update(idUser, userData);
            return this.usersRepository.findOneBy({idUser});
        }
    
        async delete(idUser: number) {
            const user= await this.usersRepository.findOneBy({idUser});
            await this.usersRepository.delete(idUser);
            return user;
        }
}
