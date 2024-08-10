import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';
import { OneOf } from './user.validator';
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

  @IsNotEmpty()
  @OneOf({ message: 'Role must be either buyer or seller' })
  role: 'buyer' | 'seller';
}
export interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: 'buyer' | 'seller';
}
