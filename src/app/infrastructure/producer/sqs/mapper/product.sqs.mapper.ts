import { CreateProductCommand } from 'src/app/domain/commands/create-product.command'
import { CreateProductMessage } from '../dto/create-product.message'
import { UpdateProductMessage } from '../dto/update-product.message'
import { UpdateProductCommand } from 'src/app/domain/commands/update-product.command'
import { RemoveProductCommand } from 'src/app/domain/commands/remove-product.command'
import { RemoveProductMessage } from '../dto/remove-product.message'

export class ProductSQSMapper {
  static toCreateProductMessage(command: CreateProductCommand): CreateProductMessage {
    return new CreateProductMessage({
      name: command.name,
      description: command.description,
      price: command.price,
    })
  }

  static toUpdateProductMessage(command: UpdateProductCommand): UpdateProductMessage {
    return new UpdateProductMessage({
      id: command.id,
      name: command.name,
      description: command.description,
      price: command.price,
    })
  }

  static toRemoveProductMessage(command: RemoveProductCommand): RemoveProductMessage {
    return new RemoveProductMessage({
      id: command.id,
    })
  }
}
