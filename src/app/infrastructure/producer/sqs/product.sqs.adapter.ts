import { ProductProducerPort } from 'src/app/domain/ports/product.producer.port'
import { CreateProductCommand } from 'src/app/domain/commands/create-product.command'
import { UpdateProductCommand } from 'src/app/domain/commands/update-product.command'
import { ProductSQSMapper } from './mapper/product.sqs.mapper'
import { RemoveProductCommand } from 'src/app/domain/commands/remove-product.command'
import { SQSProducerBase } from 'src/base/lib/interface/sqs.producer.base'
import type { LoggerPort } from 'src/base/lib/domain/logger.port'
import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { LOGGER_ADAPTER } from 'src/base/config/logger/logger-di-tokens'

import { SQSClient } from '@aws-sdk/client-sqs'
import { SQS_INITIALIZED_CLIENT } from 'src/base/config/message/message.di-tokens'
import { EnvConfigService } from 'src/base/config/env/env-config.service'

@Injectable()
export class ProductSQSClientAdapter extends SQSProducerBase implements ProductProducerPort {
  private readonly queueUrl: string

  constructor(
    @Inject(SQS_INITIALIZED_CLIENT) client: SQSClient,
    @Inject(LOGGER_ADAPTER) logger: LoggerPort,
    envConfig: EnvConfigService,
  ) {
    super(client, logger)
    this.logger.setContext(ProductSQSClientAdapter.name)
    this.queueUrl = envConfig.sqsQueueUrl
  }

  async create(command: CreateProductCommand): Promise<void> {
    const message = ProductSQSMapper.toCreateProductMessage(command)
    await this.sendMessage(this.queueUrl, message)
  }

  async update(command: UpdateProductCommand): Promise<void> {
    const message = ProductSQSMapper.toUpdateProductMessage(command)
    await this.sendMessage(this.queueUrl, message)
  }

  async remove(command: RemoveProductCommand): Promise<void> {
    const message = ProductSQSMapper.toRemoveProductMessage(command)
    await this.sendMessage(this.queueUrl, message)
  }
}
