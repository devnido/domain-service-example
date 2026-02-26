type Props = {
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export class Product {
  constructor({ id, name, description, price, createdAt, updatedAt }: Props) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}
