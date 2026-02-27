import { SQSClient } from '@aws-sdk/client-sqs'
import { Global, Module } from '@nestjs/common'
import { EnvConfigService } from '../env/env-config.service'
import { SQS_INITIALIZED_CLIENT } from './message.di-tokens'

@Module({
  providers: [
    {
      provide: SQS_INITIALIZED_CLIENT,
      useFactory: (envConfig: EnvConfigService) => new SQSClient({ region: envConfig.awsRegion }),
      inject: [EnvConfigService],
    },
  ],
  exports: [SQS_INITIALIZED_CLIENT],
})
export class MessageModule {}
