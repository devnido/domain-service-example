import { UpdateProductCommand } from 'src/app/domain/commands/update-product.command'
import { UpdateProductParamsDto } from '../dto/update-product.params.dto'
import { UpdateProductRequestDto } from '../dto/update-product.request.dto'

export class UpdateProductMapper {
  static toDomain(params: UpdateProductParamsDto, body: UpdateProductRequestDto): UpdateProductCommand {
    return new UpdateProductCommand({ id: params.id, ...body })
  }
}
