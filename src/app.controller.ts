import { Controller, Get, Post, HttpCode, UseGuards, Req, Res } from "@nestjs/common"
import { Response } from "express"
import { AuthenticationService } from "./authentication/authentication.service"
import { RequestWithUser } from "./authentication/interfaces/requestWithUser.interface"
import { LocalAuthenticationGuard } from "./authentication/guards/localAuthentication.guard"
import JwtAuthenticationGuard from "./authentication/guards/jwtAuthentication.guard"

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

  @UseGuards(JwtAuthenticationGuard)
  @Post('/logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.cookieForLogout());
    return response.sendStatus(200);
  }
}