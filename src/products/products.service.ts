import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.schema';
import { Model } from 'mongoose';
import { Rating } from './rating.schema';
import { User } from 'src/user/user.schema';
import { CreateProductDto, IProduct } from './products.dto';
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
			const { name, description, price, category, images } = productDetails;
			const user = await this.userModel.findById({ userId });
			const product = await this.productModel.create({
				user,
				name,
				description,
				price,
				category,
				imageUrl: images,
			});
			console.log(product);
			return {
				statusCode: HttpStatus.OK,
				message: "success"
			}
		}
		catch (error: any) {
			console.error(error);
			return new BadRequestException("Sorry, error occurred somewhere. Try again after some time")
		}
	}
}
