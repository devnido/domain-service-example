import { UseCase } from 'src/base/lib/application/use-case.base'
import type { ProductRepositoryPort } from '../../domain/ports/product.repository.port'
import { Product } from '../../domain/entities/product'
import { FindProductByIdQuery } from '../../domain/queries/find-product-by-id.query'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PRODUCT_REMOTE_REPOSITORY_ADAPTER } from 'src/app/di.tokens'

@Injectable()
export class ProductByIdFinder implements UseCase<FindProductByIdQuery, Product> {
  constructor(
    @Inject(PRODUCT_REMOTE_REPOSITORY_ADAPTER)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(input: FindProductByIdQuery): Promise<Product> {
    const product = await this.repository.findById(input)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }
}
