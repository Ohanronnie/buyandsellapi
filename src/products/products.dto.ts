import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { IsCurrencyCode } from './currency.validator';
import { Type } from 'class-transformer';

// ENUMS

export enum CATEGORY {
  HOME_OFFICE = 'Home & Offices',
  PHONES_TABLETS = 'Phones & Tablets',
  FASHION = 'Fashion',
  HEALTH_BEAUTY = 'Health & Beauty',
  ELECTRONICS = 'Electronics',
  COMPUTING = 'Computing',
  GROCERY = 'Grocery',
  GARDENS_OUTDOORS = 'Gardens & Outdoors',
  AUTOMOBILE = 'Automobile',
  SPORTING_GOODS = 'Sporting Goods',
  GAMING = 'Gaming',
  BABY_PRODUCTS = 'Baby Products',
}

// DTOS

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
  @IsIn(["USD"],{ message: 'Please supply a valid currency code (USD only)' })
  currencyCode: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(CATEGORY)
  category: CATEGORY;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUrl({}, { each: true })
  images: string[];
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

export class sortAndFilterProductDto {
  @IsNotEmpty()
  @IsString()
  query: string;
  @IsOptional()
  @IsString()
  order?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
  @IsOptional()
  @IsEnum(CATEGORY)
  category?: CATEGORY;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceFrom?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceTo?: number;
}
// INTERFACES

export interface IProduct {
  name: string;
  description: string;
  price: number;
  currencyCode: string;
  category: string;
  images: string[];
}
export interface ISort {
  order?: string;
  query: string;
}
export interface IFilter {
  rating?: number;
  category?: string;
  priceFrom?: number;
  priceTo?: number;
}
export interface ISortAndFilter extends ISort, IFilter {}
