import { FindProductByIdResponseDto } from '../dto/find-product-by-id.response'
import { FindAllProductsResponseDto } from '../dto/find-all-products.response'
import { Product } from 'src/app/domain/entities/product'

export class ProductHttpClientMapper {
  static toDomain(response: FindProductByIdResponseDto): Product {
    return new Product({
      id: response.id,
      name: response.name,
      description: response.description,
      price: response.price,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    })
  }

  static toDomainList(response: FindAllProductsResponseDto): Product[] {
    return response.data.map(
      (item) =>
        new Product({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    )
  }
}
