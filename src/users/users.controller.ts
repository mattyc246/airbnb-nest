import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { User } from "./entities/user.entity"
import { RequestWithUser } from '../authentication/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  @Get('/me')
  @UseGuards(JwtAuthenticationGuard)
  async findMe(@Req() request: RequestWithUser): Promise<User> {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
