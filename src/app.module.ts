import { Module } from '@nestjs/common';
import { Connection } from "typeorm"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthenticationModule
  ],
  controllers: [AppController]
})

export class AppModule {
  constructor(private connection: Connection){}
}
