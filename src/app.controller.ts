import { Controller, Get, Post, HttpCode, UseGuards, Req, Res } from "@nestjs/common"
import { Response } from "express"
import { AuthenticationService } from "./authentication/authentication.service"
import { RequestWithUser } from "./authentication/interfaces/requestWithUser.interface"
import { LocalAuthenticationGuard } from "./authentication/guards/localAuthentication.guard"
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
  async login(@Req() request: RequestWithUser, @Res() response: Response){
    const { user } = request;
    const cookie = this.authenticationService.cookieWithJwtToken(user.id)
    response.setHeader('Set-Cookie', cookie)
    user.password = undefined;
    return response.send(user)
  }
}