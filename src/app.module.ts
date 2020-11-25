import { Module } from '@nestjs/common';
import { Connection } from "typeorm"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserHttpModule } from "./users/user-http.module"

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserHttpModule
  ]
})

export class AppModule {
  constructor(private connection: Connection){}
}
