import { Controller, Get, Query } from '@nestjs/common'
import { ProductsFinder } from '../../../application/queries/products-finder'
import { ProductsResponseDto } from './dto/products.response.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { FindAllProductsMapper } from './mapper/find-all-products.mapper'
import { FindAllProductQueryParamsDto } from './dto/find-all-product.query-params.dto'

@Controller(routesV1.product.root)
@ApiTags(routesV1.product.root)
export class FindAllProductsHttpController {
  constructor(private readonly productsFinder: ProductsFinder) {}

  @Get()
  @ApiOperation({ summary: 'Find all products with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async execute(@Query() params: FindAllProductQueryParamsDto): Promise<ProductsResponseDto> {
    const query = FindAllProductsMapper.toDomain(params)

    const products = await this.productsFinder.execute(query)
    return new ProductsResponseDto(products)
  }
}
