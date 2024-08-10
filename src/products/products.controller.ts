import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  HttpException,
  Query,
  Get,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto, RateProductDto } from './products.dto';
import { Types } from 'mongoose';
import { CurrentUser } from 'src/user/user.decorator';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { ROLES } from 'src/auth/role.enum';

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Roles(ROLES.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  async createProduct(@Body() body: CreateProductDto, @Request() req): Promise<{ statusCode: HttpStatus; success: boolean; message: string; }> {
    const result = await this.productService.createProduct(
      body,
      req.user.userId,
    );
    if (result instanceof HttpException) throw result;
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Product created successfully"
    };
  }
  @Get('/search')
  async getProducts(
    @Query('query') query: string,
    @Query('order') order: string,
  ) {
    if (!query?.trim()) return [];
    const result = await this.productService.getProducts(query, { order });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      data: result
    };
  }
  @Get('/get/:id')
  async getProduct(@Param('id') id: Types.ObjectId) {
    const product = await this.productService.getProductById(id);
    if (product instanceof HttpException) throw product;
    return {
      statusCode: HttpStatus.OK,
      success: true,
      data: product
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('/rate')
  
  async rateProduct(@Body() body: RateProductDto, @CurrentUser() user: any) {
    const result = await this.productService.rateProduct(
      body.productId as unknown as Types.ObjectId,
      user.userId,
      body.rating,
      body.comment,
    );
    if (result instanceof HttpException) {
      throw result;
    }
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Product rated successfully',
    };
  }
  
  @Get("rating")
  async getProductRating(@Query("productId") productId: Types.ObjectId) {
    const result = await this.productService.getProductRatings(productId);
    if (result instanceof HttpException) throw result;
    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: result
    }
  }
}
