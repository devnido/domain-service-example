import { UseCase } from 'src/base/lib/application/use-case.base'
import type { ProductRepositoryPort } from '../../domain/ports/product.repository.port'
import { Product } from '../../domain/entities/product'
import { FindAllProductsQuery } from '../../domain/queries/find-all-products.query'
import { Inject } from '@nestjs/common'
import { PRODUCT_REMOTE_REPOSITORY_PORT } from 'src/app/di.tokens'

export class ProductsFinder implements UseCase<FindAllProductsQuery, Product[]> {
  constructor(
    @Inject(PRODUCT_REMOTE_REPOSITORY_PORT)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(input: FindAllProductsQuery): Promise<Product[]> {
    return this.repository.findAll(input)
  }
}
