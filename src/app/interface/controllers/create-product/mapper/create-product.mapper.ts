import { CreateProductCommand } from 'src/app/domain/commands/create-product.command'
import { CreateProductRequestDto } from '../dto/create-product.request.dto'

export class CreateProductMapper {
  static toDomain(createProductDto: CreateProductRequestDto): CreateProductCommand {
    return new CreateProductCommand({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
    })
  }
}
