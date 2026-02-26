import { Global, Module } from '@nestjs/common'
import { SQS_CLIENT_PORT } from './mq-client.di-tokens'
import { SQSAdapter } from './sqs.adapter'

const mqClient = {
  provide: SQS_CLIENT_PORT,
  useClass: SQSAdapter,
}

@Global()
@Module({
  providers: [mqClient],
  exports: [mqClient],
})
export class MessageQueueModule {}
