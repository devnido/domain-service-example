import { Body, Controller, Param, Put } from '@nestjs/common'
import { UpdateProductCommand } from '../../../domain/commands/update-product.command'
import { ProductUpdater } from '../../../application/commands/product-updater'
import { UpdateProductRequestDto } from './dto/update-product.request.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation } from '@nestjs/swagger'
import { SuccessResponseDto } from 'src/base/lib/controllers/generic.response.dto'

@Controller(routesV1.product.byId)
export class UpdateProductHttpController {
  constructor(private readonly productUpdater: ProductUpdater) {}

  @Put()
  @ApiOperation({ summary: 'Update an existing product' })
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateProductRequestDto,
  ) {
    const command = new UpdateProductCommand({ id, ...body })

    await this.productUpdater.execute(command)

    return new SuccessResponseDto({
      message: 'Request for updating a product processed successfully',
    })
  }
}
