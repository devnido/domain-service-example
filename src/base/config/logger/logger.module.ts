import { Global, Module } from '@nestjs/common'
import { LOGGER_PORT } from './logger-di-tokens'
import { LoggerAdapter } from './logger.adapter'

const logger = {
  provide: LOGGER_PORT,
  useClass: LoggerAdapter,
}

@Global()
@Module({
  providers: [logger],
  exports: [logger],
})
export class LoggerModule {}
