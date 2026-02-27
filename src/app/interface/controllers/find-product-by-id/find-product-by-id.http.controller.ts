import { Controller, Get, Param } from '@nestjs/common'
import { ProductByIdFinder } from '../../../application/queries/product-by-id-finder'
import { ProductResponseDto } from './dto/product.response.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FindProductByIdMapper } from './mapper/find-product-by-id.mapper'
import { FindProductByIdParamsDto } from './dto/find-product-by-id.params.dto'

@Controller(routesV1.product.root)
@ApiTags(routesV1.product.root)
export class FindProductByIdHttpController {
  constructor(private readonly productByIdFinder: ProductByIdFinder) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by ID' })
  async execute(@Param() params: FindProductByIdParamsDto): Promise<ProductResponseDto> {
    const query = FindProductByIdMapper.toDomain(params)

    const product = await this.productByIdFinder.execute(query)
    return new ProductResponseDto(product)
  }
}
