import { DeleteProductParamsDto } from '../dto/delete-product.params.dto'
import { RemoveProductCommand } from 'src/app/domain/commands/remove-product.command'

export class DeleteProductMapper {
  static toDomain(params: DeleteProductParamsDto): RemoveProductCommand {
    return new RemoveProductCommand({
      id: params.id,
    })
  }
}
