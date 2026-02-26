import { Controller, Delete, Param } from '@nestjs/common'
import { RemoveProductCommand } from '../../../domain/commands/remove-product.command'
import { ProductRemover } from '../../../application/commands/product-remover'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SuccessResponseDto } from 'src/base/lib/controllers/generic.response.dto'

@Controller(routesV1.product.root)
@ApiTags(routesV1.product.root)
export class DeleteProductHttpController {
  constructor(private readonly productRemover: ProductRemover) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  async execute(@Param('id') id: string) {
    await this.productRemover.execute(
      new RemoveProductCommand({
        id,
      }),
    )
    return new SuccessResponseDto({
      message: 'Request for deleting a product processed successfully',
    })
  }
}
