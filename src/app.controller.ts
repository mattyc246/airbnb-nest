import { Controller, Get, Post, HttpCode, UseGuards, Req } from "@nestjs/common"
import { AuthenticationService } from "./authentication/authentication.service"
import { RequestWithUser } from "./authentication/interfaces/requestWithUser.interface"
import { LocalAuthenticationGuard } from "./authentication/localAuthentication.guard"
import { User } from "./users/entities/user.entity"

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService){}

  @Get()
  root(): string{
    return "Hello World!"
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async login(@Req() request: RequestWithUser): Promise<User>{
    const user = request.user;
    user.password = undefined;
    return user
  }
}