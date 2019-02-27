import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/test')
  findAll(): Promise<any[]> {
    return this.productService.findAll();
  }

  @Post('/create')
  async create(@Body() product: Product, @Res() res) {
      console.log(product);
      this.productService.create(product);
      res.status(HttpStatus.CREATED).send();
  }

}
