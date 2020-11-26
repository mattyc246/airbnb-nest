import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service"
import { TokenPayload } from './interfaces/tokenPayload.interface';

const bcrypt = require('bcrypt')

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public cookieWithJwtToken(userId: number){
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public cookieForLogout(){
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

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
