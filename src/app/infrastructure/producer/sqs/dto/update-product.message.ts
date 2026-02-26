import { Message } from 'src/base/lib/domain/message.base'

type Props = {
  id: string
  name: string
  description: string
  price: number
}

export class UpdateProductMessage extends Message {
  constructor({ id, name, description, price }: Props) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.price = price
  }

  readonly id: string
  readonly name: string
  readonly description: string
  readonly price: number
}
