import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Rating } from './rating.schema';
import { User } from 'src/user/user.schema';
import { CreateProductDto, IProduct, ISort } from './products.dto';
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createProduct(productDetails: IProduct, userId: string) {
    try {
      const { name, description, currencyCode, price, category, images } =
        productDetails;
      const user = await this.userModel.findById(userId);
      const product = await this.productModel.create({
        user,
        name,
        description,
        currencyCode,
        price,
        category,
        imageUrl: images,
      });
      console.log(product);
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    } catch (error: any) {
      console.error(error);
      return new BadRequestException(
        'Sorry, error occurred somewhere. Try again after some time',
      );
    }
  }
  async getProducts(query: string, sort?: ISort) {
    const products = await this.productModel
      .find({
        $or: [
          {
            name: {
              $regex: query,
              $options: 'i',
            },
          },
          { description: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
        ],
      })
      .select('price name currencyCode');

    if (sort) {
      sort.order && sort.order === 'desc'
        ? products.sort((a, b) => b.price - a.price)
        : products.sort((a, b) => a.price - b.price);
    }
    return products.map((value) => ({
      productId: value._id,
      name: value.name,
      price: value.price,
      currencyCode: value.currencyCode,
    }));
  }
  async getProductById(productId: Types.ObjectId) {
    const product = await this.productModel
      .findById(productId)
      .populate('ratings user');
    if (!product) return new NotFoundException('Product not found');
    const averageRating = (ratings: Rating[]) => {
      return (
        ratings.reduce(
          (accumulator, currentValue) => accumulator + currentValue.rating,
          0,
        ) / ratings.length
      );
    };
    const ratingCount = (rating: Rating[]) => {
      return rating.reduce((accumulator, current) => {
        let a = accumulator;
        let c = current.rating;
        let b = a[c];
        return b ? { ...a, [c]: b + 1 } : { ...a, [c]: 1 };
      }, {});
    };
    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      currencyCode: product.currencyCode,
      description: product.description,
      averageRating: averageRating(product.ratings),
      totalRating: product.ratings.length,
      ratingCounts: ratingCount(product.ratings),
      sellerName: product.user.firstName + ' ' + product.user.lastName,
      // suggestedProduct
    };
  }
}
