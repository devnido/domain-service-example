import { Inject, Injectable } from '@nestjs/common'
import { Product } from '../../../domain/entities/product'
import type { ProductRepositoryPort } from '../../../domain/ports/product.repository.port'
import { FindAllProductsQuery } from '../../../domain/queries/find-all-products.query'
import { FindProductByIdQuery } from '../../../domain/queries/find-product-by-id.query'
import { FindProductByIdResponseDto } from './dto/find-product-by-id.response'
import { ProductHttpClientMapper } from './mapper/product.http-client.mapper'
import { FindAllProductsResponseDto } from './dto/find-all-products.response'
import type { HttpClientPort } from 'src/base/config/http/http-client.port'
import { HTTP_CLIENT_PORT } from 'src/base/config/http/http-client-di-tokens'

@Injectable()
export class ProductHttpClientAdapter implements ProductRepositoryPort {
  constructor(
    @Inject(HTTP_CLIENT_PORT)
    private readonly httpClient: HttpClientPort,
  ) {}

  async findById(query: FindProductByIdQuery): Promise<Product | null> {
    const response = await this.httpClient.get<FindProductByIdResponseDto>(`/products/${query.id}`).catch((error) => {
      throw new Error(error.message)
    })

    if (!response?.data) {
      return null
    }

    return ProductHttpClientMapper.toDomain(response?.data)
  }

  async findAll(query: FindAllProductsQuery): Promise<Product[]> {
    const { page, limit } = query
    const response = await this.httpClient
      .get<FindAllProductsResponseDto>(`/products?page=${page}&limit=${limit}`)
      .catch((error) => {
        throw new Error(error.message)
      })

    if (!response?.data) {
      return []
    }

    return ProductHttpClientMapper.toDomainList(response?.data)
  }
}
