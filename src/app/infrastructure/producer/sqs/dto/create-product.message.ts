import { Message } from 'src/base/lib/domain/message.base'

type Props = {
  name: string
  description: string
  price: number
}

export class CreateProductMessage extends Message {
  constructor({ name, description, price }: Props) {
    super()
    this.name = name
    this.description = description
    this.price = price
  }

  readonly name: string
  readonly description: string
  readonly price: number
}
