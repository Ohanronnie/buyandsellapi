import { Controller, Request, UseGuards, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './products.dto';

@Controller('product')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {
		
	}
	@UseGuards(JwtAuthGuard)
	@Post("/create")
	async createProduct(@Body() body: CreateProductDto, @Request() req) {
		const result = await this.productService.createProduct(body, req.user.userId);
		console.log(result)
	}
}
