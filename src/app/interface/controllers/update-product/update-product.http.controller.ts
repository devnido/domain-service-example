import { Body, Controller, Param, Put } from '@nestjs/common'
import { ProductUpdater } from '../../../application/commands/product-updater'
import { UpdateProductRequestDto } from './dto/update-product.request.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation } from '@nestjs/swagger'
import { SuccessResponseDto } from 'src/base/lib/controllers/generic.response.dto'
import { UpdateProductMapper } from './mapper/update-product.mapper'
import { UpdateProductParamsDto } from './dto/update-product.params.dto'

@Controller(routesV1.product.byId)
export class UpdateProductHttpController {
  constructor(private readonly productUpdater: ProductUpdater) {}

  @Put()
  @ApiOperation({ summary: 'Update an existing product' })
  async execute(@Param() params: UpdateProductParamsDto, @Body() body: UpdateProductRequestDto) {
    const command = UpdateProductMapper.toDomain(params, body)

    await this.productUpdater.execute(command)

    return new SuccessResponseDto({
      message: 'Request for updating a product processed successfully',
    })
  }
}
