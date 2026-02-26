import { Controller, Get, Param } from '@nestjs/common'
import { FindProductByIdQuery } from '../../../domain/queries/find-product-by-id.query'
import { ProductByIdFinder } from '../../../application/queries/product-by-id-finder'
import { ProductResponseDto } from './dto/product.response.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller(routesV1.product.root)
@ApiTags(routesV1.product.root)
export class FindProductByIdHttpController {
  constructor(private readonly productByIdFinder: ProductByIdFinder) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by ID' })
  async execute(@Param('id') id: string): Promise<ProductResponseDto> {
    const query = new FindProductByIdQuery({ id })

    const product = await this.productByIdFinder.execute(query)
    return new ProductResponseDto(product)
  }
}
