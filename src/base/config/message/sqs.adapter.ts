import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { MqClientPort } from './mq-client.port'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { EnvConfigService } from '../env/env-config.service'
import type { LoggerPort } from '../logger/logger.port'
import { LOGGER_PORT } from '../logger/logger-di-tokens'
import { Inject } from '@nestjs/common'
import { Message } from 'src/base/lib/domain/message.base'

@Injectable()
export class SQSAdapter implements MqClientPort, OnModuleInit {
  private client: SQSClient
  private queueUrl: string

  constructor(
    private readonly envConfig: EnvConfigService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {
    this.logger.setContext(SQSAdapter.name)
  }

  onModuleInit() {
    this.logger.log('Initializing SQS client')
    this.queueUrl = this.envConfig.sqsQueueUrl
    this.client = new SQSClient({
      region: this.envConfig.awsRegion,
    })
    this.logger.log('SQS client initialized')
  }

  async sendMessage(message: Message): Promise<void> {
    this.logger.log('Sending message to SQS')
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(message),
    })

    try {
      const result = await this.client.send(command)
      this.logger.log(`Message sent successfully. MessageId: ${result.MessageId}`)
    } catch (error) {
      this.logger.error(`Failed to send message to SQS: ${error.message}`, error.stack)
      throw error
    }
  }
}
