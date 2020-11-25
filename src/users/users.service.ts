import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PostgresErrorCode } from "../database/postgresErrorCodes.enum"
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser)
      newUser.password = undefined
      return newUser;
    } catch (error) {
      if(error?.code === PostgresErrorCode.UniqueViolation){
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}