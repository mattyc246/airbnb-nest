import { Body, Controller, Get, Post } from "@nestjs/common"
import { create } from "domain"
import { AuthenticationService } from "./authentication/authentication.service"
import { CreateSessionDto } from "./authentication/dto/create-session.dto"

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService){}

  @Get()
  root(): string{
    return "Hello World!"
  }

  @Post('/login')
  async login(@Body() createSessionDto: CreateSessionDto): Promise<string>{
    const res = await this.authenticationService.authenticateUser(createSessionDto.email, createSessionDto.password)
    console.log(res)
    return "Login"
  }
}