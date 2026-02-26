import { ProductProducerPort } from 'src/app/domain/ports/product.producer.port'
import { Inject } from '@nestjs/common'
import { SQS_CLIENT_PORT } from 'src/base/config/message/mq-client.di-tokens'
import type { MqClientPort } from 'src/base/config/message/mq-client.port'
import { CreateProductCommand } from 'src/app/domain/commands/create-product.command'
import { UpdateProductCommand } from 'src/app/domain/commands/update-product.command'
import { ProductSQSMapper } from './mapper/product.sqs.mapper'
import { RemoveProductCommand } from 'src/app/domain/commands/remove-product.command'

export class ProductSQSClientAdapter implements ProductProducerPort {
  constructor(
    @Inject(SQS_CLIENT_PORT)
    private readonly sqsClient: MqClientPort,
  ) {}

  async create(command: CreateProductCommand): Promise<void> {
    const message = ProductSQSMapper.toCreateProductMessage(command)
    await this.sqsClient.sendMessage(message)
  }

  async update(command: UpdateProductCommand): Promise<void> {
    const message = ProductSQSMapper.toUpdateProductMessage(command)
    await this.sqsClient.sendMessage(message)
  }

  async remove(command: RemoveProductCommand): Promise<void> {
    const message = ProductSQSMapper.toRemoveProductMessage(command)
    await this.sqsClient.sendMessage(message)
  }
}
