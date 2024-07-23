import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPhoneNumber()
  phoneNumber: string;

}
export interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
}
