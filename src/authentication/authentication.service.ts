import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from "../users/users.service"

const bcrypt = require('bcrypt')

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  public async authenticateUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const matchingPassword = await bcrypt.compare(
        hashedPassword,
        user.password
      );
      if (!matchingPassword) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
