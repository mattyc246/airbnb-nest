import { IsString, IsNumber } from "class-validator"

export class CreateListingDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly location: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly noOfGuests: number;
}
