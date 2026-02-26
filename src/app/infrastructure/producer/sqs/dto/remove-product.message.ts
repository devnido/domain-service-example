import { Message } from 'src/base/lib/domain/message.base'

type Props = {
  id: string
}

export class RemoveProductMessage extends Message {
  constructor({ id }: Props) {
    super()
    this.id = id
  }

  readonly id: string
}
