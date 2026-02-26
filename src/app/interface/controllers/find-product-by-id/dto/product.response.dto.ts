import { ApiProperty } from '@nestjs/swagger'
import { Product } from '../../../../domain/entities/product'

export class ProductResponseDto {
  constructor(product: Product) {
    this.id = product.id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.createdAt = product.createdAt
    this.updatedAt = product.updatedAt
  }

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
