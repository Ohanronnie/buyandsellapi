import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.schema';
import mongoose, { AggregateOptions, Model, PipelineStage, Types } from 'mongoose';
import { Rating } from './rating.schema';
import { User } from 'src/user/user.schema';
import {
  CATEGORY,
  CreateProductDto,
  IFilter,
  IProduct,
  ISort,
  ISortAndFilter,
} from './products.dto';
import { CreateUserDto } from 'src/user/user.dto';
import { PipelineCallback } from 'stream';
import { of } from 'rxjs';

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
  async getProducts(query: ISort & IFilter) {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          $or: [
            {
              name: {
                $regex: query.query,
                $options: 'i',
              },
            },
            { description: { $regex: query.query, $options: 'i' } },
            { category: { $regex: query.query, $options: 'i' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'product',
          as: 'ratings',
        },
      },
      {
        $addFields: {
          averageRating: {
            $avg: '$ratings.rating',
          },
        },
      },
    ] as any;
    if (query.rating) {
      console.log(query.rating)
      pipeline.push({
        $match: {
          averageRating: {
            $gte: Number(query.rating),
          },
        },
      });
    }
    console.log(Object.values(CATEGORY))
    if (query.priceFrom) {
      pipeline.push({
        $match: {
          price: {
            $gte: Number(query.priceFrom)
          }
        }
      })
    }
    if (query.priceTo) {
      pipeline.push({
        $match: {
          price: {
            $lte: Number(query.priceTo)
          }
        }
      })
    }
    if (query.category) {
      
    }
    if (query.order === 'desc') {
      pipeline.push({
        $sort: {
          price: -1,
        },
      });
    } else if (query.order === 'asc') {
      pipeline.push({
        $sort: {
          price: 1,
        },
      });
    }
    pipeline.push({
      $project: {
        price: 1,
        name: 1,
        currencyCode: 1,
        averageRating: 1,
      },
    });
    const products = await this.productModel.aggregate(pipeline);

    //.select('price name currencyCode');
    // console.log(products)

    // if(query.order)
   /* query.order && query.order === 'desc'
      ? products.sort((a, b) => b.price - a.price)
      : products.sort((a, b) => a.price - b.price);*/
 
  

    return products.map((value) => ({
      productId: value._id,
      name: value.name,
      price: value.price,
      currencyCode: value.currencyCode,
      averageRating: value.averageRating
    }));
  }
  async getProductById(productId: Types.ObjectId) {
    try {
      const product = await this.productModel
        .findById(productId)
        .populate('user');
      if (!product) return new NotFoundException('Product not found');

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        currencyCode: product.currencyCode,
        description: product.description,
        ...(await this.getProductRatings(productId)),
        sellerName: product.user.firstName + ' ' + product.user.lastName,
        // suggestedProduct
      };
    } catch (error: any) {
      return new NotFoundException('Product not found');
    }
  }
  async rateProduct(
    productId: Types.ObjectId,
    userId: Types.ObjectId,
    ratings: number,
    comment: string,
  ) {
    try {
      let product = await this.productModel.findById(productId);
      let user = await this.userModel.findById(userId);
      if (!product) return new NotFoundException('Product not found');
      const rating = await this.ratingModel.create({
        product,
        user,
        rating: ratings,
        comment,
      });
      return true;
    } catch (error: any) {
      console.error(error);
      return new BadRequestException('Something is wrong with your request.');
    }
  }
  async getProductRatings(productId: Types.ObjectId) {
    try {
      const rating = await this.ratingModel
        .find({ product: productId })
        .populate('user');
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
        averageRating: averageRating(rating),
        totalRating: rating.length,
        ratingCount: ratingCount(rating),
        comments: rating.map((e) => ({
          username: e.user.fullName,
          comment: e.comment,
        })),
      };
    } catch (error: any) {
      return new NotFoundException('Rating not found');
    }
  }
}
