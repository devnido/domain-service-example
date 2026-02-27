import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { EnvConfigService } from '../../config/env/env-config.service'
import type { LoggerPort } from '../domain/logger.port'

import { Message } from 'src/base/lib/domain/message.base'

export class SQSProducerBase {
  constructor(
    private readonly client: SQSClient,
    protected readonly logger: LoggerPort,
  ) {}

  async sendMessage(queueUrl: string, message: Message): Promise<void> {
    this.logger.log('Sending message to SQS')
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
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
