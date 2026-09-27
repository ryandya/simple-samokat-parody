import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductDTO } from './dto/product.dto.js';
import { Auth } from '../auth/decorators/auth.decorator.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug)
  }

  @Get('by-category/:categorySlug')
  async getProudctsByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.getByCategory(categorySlug)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: ProductDTO) {
    return this.productService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: ProductDTO) {
    return this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
