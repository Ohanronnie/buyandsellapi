import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';
export interface ILoginUser {
  email: string;
  password: string;
}
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
