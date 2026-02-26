export class FindAllProductsResponseDto {
  data: ProductItemDto[]
  total: number
}

class ProductItemDto {
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}
