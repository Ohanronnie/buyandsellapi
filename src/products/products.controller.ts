import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  HttpException,
  Query,
  Get,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './products.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createProduct(@Body() body: CreateProductDto, @Request() req) {
    const result = await this.productService.createProduct(
      body,
      req.user.userId,
    );
    if (result instanceof HttpException) throw result;
    return result;
  }
  @Get('/search')
  async getProducts(
    @Query('query') query: string,
    @Query('order') order: string,
  ) {
    if (!query?.trim()) return [];
    const result = await this.productService.getProducts(query, { order });
    return result;
  }
}
