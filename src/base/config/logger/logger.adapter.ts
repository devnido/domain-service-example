import { Injectable, Logger, Scope } from '@nestjs/common'
import { LoggerPort } from '../../lib/domain/logger.port'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerAdapter implements LoggerPort {
  private logger = new Logger()

  setContext(context: string): void {
    this.logger = new Logger(context)
  }

  log(message: string, ...meta: unknown[]): void {
    this.logger.log(message, ...meta)
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    this.logger.error(message, trace, ...meta)
  }

  warn(message: string, ...meta: unknown[]): void {
    this.logger.warn(message, ...meta)
  }

  debug(message: string, ...meta: unknown[]): void {
    this.logger.debug(message, ...meta)
  }
}
