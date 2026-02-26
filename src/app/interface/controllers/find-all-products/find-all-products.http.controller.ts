import { Controller, Get, Query } from '@nestjs/common'
import { FindAllProductsQuery } from '../../../domain/queries/find-all-products.query'
import { ProductsFinder } from '../../../application/queries/products-finder'
import { ProductsResponseDto } from './dto/products.response.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller(routesV1.product.root)
@ApiTags(routesV1.product.root)
export class FindAllProductsHttpController {
  constructor(private readonly productsFinder: ProductsFinder) {}

  @Get()
  @ApiOperation({ summary: 'Find all products with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async execute(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ProductsResponseDto> {
    const products = await this.productsFinder.execute(
      new FindAllProductsQuery({
        page: Number(page),
        limit: Number(limit),
      }),
    )
    return new ProductsResponseDto(products)
  }
}
