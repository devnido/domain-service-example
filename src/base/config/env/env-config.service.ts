import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Environment, EnvVars } from './env-config.validation'

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService<EnvVars>) {}

  get port(): number {
    return this.configService.get<number>('PORT') ?? 3000
  }

  get nodeEnv(): string {
    return (this.configService.get<string>('NODE_ENV') ?? Environment.DEVELOPMENT) as Environment
  }

  get externalServiceApiUrl(): string {
    return this.configService.get<string>('EXTERNAL_SERVICE_API_URL') ?? 'http://localhost:3500'
  }
  get awsRegion(): string {
    return this.configService.get<string>('AWS_REGION') ?? 'us-east-1'
  }

  get sqsQueueUrl(): string {
    return this.configService.get<string>('SQS_QUEUE_URL') ?? ''
  }
}
