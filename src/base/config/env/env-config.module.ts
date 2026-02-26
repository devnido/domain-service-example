import { Global, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigJoiSchema } from './env-config.validation';

@Global()
@Module({
  providers: [EnvConfigService],
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvConfigJoiSchema,
    }),
  ],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
