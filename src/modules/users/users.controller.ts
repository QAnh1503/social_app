import { UsersService } from './users.service';
import {  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import CreateProductDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }

  
    // @Get(':id') 
    // async findOne(@Param('id') id: number) {
    //   const user= await this.usersService.findOne(id);
    //   if (!user) {
    //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return user;
    // }

    // @Get(':idUser') 
    // async findById(@Param('idUser') idUser: number) {
    //   const user= await this.usersService.findOne(""+idUser);
    //   if (!user) {
    //     throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return user;
    // }

    @Get('id/:idUser') // http://...../users/id/2
    async findById(@Param('idUser') idUser: number) {
      const user = await this.usersService.findById(idUser); // hoặc parseInt(idUser)
      if (!user) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return user;
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return user;
    }


    // @Get(':email') 
    // async findOne(@Param('email') email: string) {
    //   const user= await this.usersService.findOne(email);
    //   if (!user) {
    //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return user;
    // }

    // @Post('login')
    // async login(@Body() body: { email: string; password: string }) {
    //   const user = await this.usersService.findByEmail(body.email);
    //   if (!user) {
    //     throw new UnauthorizedException('Invalid credentials');
    //   }

    //   const isMatch = await bcrypt.compare(body.password, user.password);
    //   if (!isMatch) {
    //     throw new UnauthorizedException('Invalid credentials');
    //   }
    // }
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      const user = await this.usersService.findByEmail(body.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (body.password !== user.password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        message: 'Login successful',
        user, // hoặc chỉ return thông tin cần thiết
      };
    }

  
    @Post('register') 
    create (@Body() userData: CreateProductDto ) {
      return this.usersService.create(userData);
    }
  
    @Patch(':id') 
    update (@Body() userData: UpdateUserDto, @Param('id') id: number ) {
      return this.usersService.update(id, userData);
    }
  
    // @Delete(':id')
    // async delete (@Param('id') id: number) {
    //   const user= await this.usersService.findOne(id);
    //   if (!user) {
    //     throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return this.usersService.delete(id);;
    // }
}
