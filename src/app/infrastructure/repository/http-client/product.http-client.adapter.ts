import { Inject, Injectable } from '@nestjs/common'
import { Product } from '../../../domain/entities/product'
import type { ProductRepositoryPort } from '../../../domain/ports/product.repository.port'
import { FindAllProductsQuery } from '../../../domain/queries/find-all-products.query'
import { FindProductByIdQuery } from '../../../domain/queries/find-product-by-id.query'
import { FindProductByIdResponseDto } from './dto/find-product-by-id.response'
import { ProductHttpClientMapper } from './mapper/product.http-client.mapper'
import { FindAllProductsResponseDto } from './dto/find-all-products.response'
import { AxiosHttpClient } from 'src/base/config/http/axios.http-client'
import { EnvConfigService } from 'src/base/config/env/env-config.service'
import type { LoggerPort } from 'src/base/lib/domain/logger.port'
import { LOGGER_ADAPTER } from 'src/base/config/logger/logger-di-tokens'

@Injectable()
export class ProductHttpClientAdapter extends AxiosHttpClient implements ProductRepositoryPort {
  constructor(envConfig: EnvConfigService, @Inject(LOGGER_ADAPTER) logger: LoggerPort) {
    super(envConfig)
  }

  async findById(query: FindProductByIdQuery): Promise<Product | null> {
    const response = await this.get<FindProductByIdResponseDto>(`/products/${query.id}`).catch((error) => {
      throw new Error(error.message)
    })

    if (!response?.data) {
      return null
    }

    return ProductHttpClientMapper.toDomain(response?.data)
  }

  async findAll(query: FindAllProductsQuery): Promise<Product[]> {
    const { page, limit } = query
    const response = await this.get<FindAllProductsResponseDto>(`/products?page=${page}&limit=${limit}`).catch((error) => {
      throw new Error(error.message)
    })

    if (!response?.data) {
      return []
    }

    return ProductHttpClientMapper.toDomainList(response?.data)
  }
}
