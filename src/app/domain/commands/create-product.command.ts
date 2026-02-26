import { Command } from 'src/base/lib/domain/command.base'

type Props = {
  name: string
  description: string
  price: number
}

export class CreateProductCommand extends Command {
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
