import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { FollowingService } from './following.service';

@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}
  @Get()
    findAll() {
      return this.followingService.findAll();
    }
  
    // @Get(':idUserFollowing')
    // async findOne(@Param('idUserFollowing') idUserFollowing: number) {
    //   const follwing = await this.followingService.findOne(idUserFollowing);
    //   if (!follwing) {
    //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return follwing;
    // }
    @Get('exists/:idUser/:idUserFollowing')
    async exists(
      @Param('idUser') idUser: number,
      @Param('idUserFollowing') idUserFollowing: number
    ) {
      const exists = await this.followingService.exists(idUser, idUserFollowing);
      return { exists }; // trả về đối tượng { exists: true/false }
    }

    @Get(':idUser')
    async findManyCmtWithIdPost(@Param('idUser') idUser: number) {
      const following = await this.followingService.findMany(idUser);
      if (!following) {
        throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      }
      return following;
    }
  
    @Post('following')
    create(@Body() followingData) {
      return this.followingService.create(followingData);
    }
  
    // @Delete(':idFollowing')
    // async delete(@Param('idFollowing') idFollowing: number) {
    //   const following = await this.followingService.findOne(idFollowing);
    //   if (!following) {
    //     throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    //   }
    //   return this.followingService.delete(idFollowing);
    // }
    @Delete(':idUser/:idUserFollowing')
    async delete(
      @Param('idUser') idUser: number,
      @Param('idUserFollowing') idUserFollowing: number,
    ) {
      const following = await this.followingService.findOneByUsers(idUser, idUserFollowing);
      if (!following) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return this.followingService.delete(following.idFollowing); // Xoá theo id chính
    }

}
