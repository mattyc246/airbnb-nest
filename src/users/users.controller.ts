import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { User } from "./entities/user.entity"

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
}
