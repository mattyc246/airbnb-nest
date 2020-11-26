import { Controller, Get, Post, Body, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { User } from "./entities/user.entity"
import { RequestWithUser } from '../authentication/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';
import { TransformInterceptor } from './transform.interceptor';

@Controller('users')
@UseInterceptors(TransformInterceptor)
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
    return user;
  }
}
