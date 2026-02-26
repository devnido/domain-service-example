import { CreateProductCommand } from '../commands/create-product.command'
import { RemoveProductCommand } from '../commands/remove-product.command'
import { UpdateProductCommand } from '../commands/update-product.command'

export interface ProductProducerPort {
  create(command: CreateProductCommand): Promise<void>
  update(command: UpdateProductCommand): Promise<void>
  remove(command: RemoveProductCommand): Promise<void>
}
