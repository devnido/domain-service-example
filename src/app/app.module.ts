import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { EnvConfigModule } from 'src/base/config/env/env-config.module'
import { HttpClientModule } from 'src/base/config/http/http-client.module'
import { MessageQueueModule } from 'src/base/config/message/mq-client.module'
import { LoggerModule } from 'src/base/config/logger/logger.module'
import { CreateProductHttpController } from './interface/controllers/create-product/create-product.http.controller'
import { UpdateProductHttpController } from './interface/controllers/update-product/update-product.http.controller'
import { DeleteProductHttpController } from './interface/controllers/delete-product/delete-product.http.controller'
import { FindProductByIdHttpController } from './interface/controllers/find-product-by-id/find-product-by-id.http.controller'
import { FindAllProductsHttpController } from './interface/controllers/find-all-products/find-all-products.http.controller'
import { ProductCreator } from './application/commands/product-creator'
import { ProductUpdater } from './application/commands/product-updater'
import { ProductRemover } from './application/commands/product-remover'
import { ProductByIdFinder } from './application/queries/product-by-id-finder'
import { ProductsFinder } from './application/queries/products-finder'
import { PRODUCT_PRODUCER_PORT, PRODUCT_REMOTE_REPOSITORY_PORT } from './di.tokens'
import { ProductSQSClientAdapter } from './infrastructure/producer/sqs/product.sqs.adapter'
import { ProductHttpClientAdapter } from './infrastructure/repository/http-client/product.http-client.adapter'

@Module({
  imports: [EnvConfigModule, HttpClientModule, MessageQueueModule, LoggerModule],
  controllers: [
    CreateProductHttpController,
    UpdateProductHttpController,
    DeleteProductHttpController,
    FindProductByIdHttpController,
    FindAllProductsHttpController,
    AppController,
  ],
  providers: [
    ProductCreator,
    ProductUpdater,
    ProductRemover,
    ProductByIdFinder,
    ProductsFinder,
    {
      provide: PRODUCT_PRODUCER_PORT,
      useClass: ProductSQSClientAdapter,
    },
    {
      provide: PRODUCT_REMOTE_REPOSITORY_PORT,
      useClass: ProductHttpClientAdapter,
    },
  ],
})
export class AppModule {}
