import { UseCase } from 'src/base/lib/application/use-case.base'
import { RemoveProductCommand } from '../../domain/commands/remove-product.command'
import type { ProductProducerPort } from '../../domain/ports/product.producer.port'
import { Inject } from '@nestjs/common'
import { PRODUCT_PRODUCER_PORT } from 'src/app/di.tokens'

export class ProductRemover implements UseCase<RemoveProductCommand> {
  constructor(
    @Inject(PRODUCT_PRODUCER_PORT)
    private readonly producer: ProductProducerPort,
  ) {}

  execute(input: RemoveProductCommand): Promise<void> {
    return this.producer.remove(input)
  }
}
