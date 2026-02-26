import { ApiProperty } from '@nestjs/swagger'
import { Product } from '../../../../domain/entities/product'

class ProductItemDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Product ID',
  })
  readonly id: string

  @ApiProperty({
    example: 'Product name',
    description: 'Product name',
  })
  readonly name: string

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  readonly description: string

  @ApiProperty({
    example: 100,
    description: 'Product price',
  })
  readonly price: number

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Product creation date',
  })
  readonly createdAt: Date

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Product last update date',
  })
  readonly updatedAt: Date
}

export class ProductsResponseDto {
  constructor(products: Product[]) {
    this.data = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))
    this.total = products.length
  }

  @ApiProperty({
    type: [ProductItemDto],
    description: 'List of products',
  })
  readonly data: ProductItemDto[]

  @ApiProperty({
    example: 10,
    description: 'Total number of products returned',
  })
  readonly total: number
}
