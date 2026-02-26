import type { ProductProducerPort } from '../../domain/ports/product.producer.port'
import { CreateProductCommand } from '../../domain/commands/create-product.command'
import { Inject } from '@nestjs/common'
import { UseCase } from 'src/base/lib/application/use-case.base'
import { PRODUCT_PRODUCER_PORT } from 'src/app/di.tokens'

export class ProductCreator implements UseCase<CreateProductCommand> {
  constructor(
    @Inject(PRODUCT_PRODUCER_PORT)
    private readonly producer: ProductProducerPort,
  ) {}

  execute(input: CreateProductCommand): Promise<void> {
    return this.producer.create(input)
  }
}
