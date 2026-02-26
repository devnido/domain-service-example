import { Product } from '../entities/product'
import { FindAllProductsQuery } from '../queries/find-all-products.query'
import { FindProductByIdQuery } from '../queries/find-product-by-id.query'

export interface ProductRepositoryPort {
  findById(query: FindProductByIdQuery): Promise<Product | null>
  findAll(query: FindAllProductsQuery): Promise<Product[]>
}
