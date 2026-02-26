import { Global, Module } from '@nestjs/common'
import { AxiosAdapter } from './axios.adapter'
import { HTTP_CLIENT_PORT } from './http-client-di-tokens'

const httpClient = {
  provide: HTTP_CLIENT_PORT,
  useClass: AxiosAdapter,
}

@Global()
@Module({
  providers: [httpClient],
  exports: [httpClient],
})
export class HttpClientModule {}
