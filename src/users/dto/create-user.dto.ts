import { IsString, IsEmail } from "class-validator"

export class CreateUserDto {
  @IsString()
  readonly fullName: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}