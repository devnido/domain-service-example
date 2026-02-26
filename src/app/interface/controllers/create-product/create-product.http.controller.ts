import { Body, Controller, Post } from '@nestjs/common'
import { CreateProductCommand } from '../../../domain/commands/create-product.command'
import { ProductCreator } from '../../../application/commands/product-creator'
import { CreateProductRequestDto } from './dto/create-product.request.dto'
import { routesV1 } from 'src/base/config/routes/app.routes'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SuccessResponseDto } from 'src/base/lib/controllers/generic.response.dto'

@Controller(routesV1.product.root)
export class CreateProductHttpController {
  constructor(private readonly productCreator: ProductCreator) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async execute(@Body() body: CreateProductRequestDto) {
    await this.productCreator.execute(new CreateProductCommand(body))
    return new SuccessResponseDto({
      message: 'Request for creating a product processed successfully',
    })
  }
}
