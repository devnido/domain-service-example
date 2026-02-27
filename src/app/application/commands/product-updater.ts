import type { ProductProducerPort } from '../../domain/ports/product.producer.port'
import { UpdateProductCommand } from '../../domain/commands/update-product.command'
import { Inject } from '@nestjs/common'
import { UseCase } from 'src/base/lib/application/use-case.base'
import { PRODUCT_PRODUCER_ADAPTER } from 'src/app/di.tokens'

export class ProductUpdater implements UseCase<UpdateProductCommand> {
  constructor(
    @Inject(PRODUCT_PRODUCER_ADAPTER)
    private readonly producer: ProductProducerPort,
  ) {}

  execute(input: UpdateProductCommand): Promise<void> {
    return this.producer.update(input)
  }
}
