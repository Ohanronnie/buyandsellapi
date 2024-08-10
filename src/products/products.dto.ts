import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { IsCurrencyCode } from './currency.validator';
import { Type } from 'class-transformer';

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
export class RateProductDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
