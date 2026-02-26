import { Command } from 'src/base/lib/domain/command.base'

type Props = {
  id: string
}

export class RemoveProductCommand extends Command {
  constructor({ id }: Props) {
    super()
    this.id = id
  }

  readonly id: string
}
