import { Module } from '@nestjs/common';
import { Connection } from "typeorm"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { UsersModule } from './users/users.module';
import * as Joi from "@hapi/joi"
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required()
      })
    }),
    UsersModule,
    AuthenticationModule
  ],
  controllers: [AppController]
})

export class AppModule {
  constructor(private connection: Connection){}
}
