import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { IsCurrencyCode } from './currency.validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsCurrencyCode({ message: 'Please supply a valid currency code' })
  currencyCode: string;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUrl({}, { each: true })
  images: string[];
}
export interface IProduct {
  name: string;
  description: string;
  price: number;
  currencyCode: string;
  category: string;
  images: string[];
}
export interface ISort {
  order: string;
}
