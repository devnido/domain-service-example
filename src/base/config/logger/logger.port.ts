export interface LoggerPort {
  setContext(context: string): void
  log(message: string, ...meta: unknown[]): void
  error(message: string, trace?: unknown, ...meta: unknown[]): void
  warn(message: string, ...meta: unknown[]): void
  debug(message: string, ...meta: unknown[]): void
}
