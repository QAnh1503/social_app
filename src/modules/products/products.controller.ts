import {  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id') 
  async findOne(@Param('id') id: number) {
    const product= await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post() 
  create (@Body() productData: CreateProductDto ) {
    return this.productsService.create(productData);
  }

  @Patch(':id') 
  update (@Body() productData: UpdateProductDto, @Param('id') id: number ) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  async delete (@Param('id') id: number) {
    const product= await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    }
    return this.productsService.delete(id);;
  }
}

