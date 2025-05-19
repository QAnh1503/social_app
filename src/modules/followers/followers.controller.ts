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
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}
  @Get()
  findAll() {
    return this.followersService.findAll();
  }

  // @Get(':idUserFollower')
  // async findOne(@Param('idUserFollower') idUserFollower: number) {
  //   const follwer = await this.followersService.findOne(idUserFollower);
  //   if (!follwer) {
  //     throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
  //   }
  //   return follwer;
  // }
  @Get('exists/:idUser/:idUserFollower')
  async exists(
    @Param('idUser') idUser: number,
    @Param('idUserFollower') idUserFollower: number
  ) {
    const exists = await this.followersService.exists(idUser, idUserFollower);
    return { exists }; // trả về đối tượng { exists: true/false }
  }

  @Get(':idUser')
    async findManyCmtWithIdPost(@Param('idUser') idUser: number) {
      const followers = await this.followersService.findMany(idUser);
      if (!followers) {
        throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
      }
      return followers;
  }

  @Post('follower')
  create(@Body() followerData) {
    return this.followersService.create(followerData);
  }

   @Delete('delete/:idUser/:idUserFollower')
  async deleteByIdUserIdUserFollower(
      @Param('idUser') idUser: number,
      @Param('idUserFollower') idUserFollower: number,
    ) {
      const follower = await this.followersService.findOneByUsers(idUser, idUserFollower);
      if (!follower) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }
      return this.followersService.delete(follower.idFollower); // Xoá theo id chính
  }

  @Delete(':idFollower')
  async delete(@Param('idFollower') idFollower: number) {
    const follower = await this.followersService.findOneIdFollower(idFollower);
    if (!follower) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
    return this.followersService.delete(idFollower);
  }
}
