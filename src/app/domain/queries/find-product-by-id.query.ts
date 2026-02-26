import { Query } from 'src/base/lib/domain/query.base'

type Props = {
  id: string
}

export class FindProductByIdQuery extends Query {
  constructor({ id }: Props) {
    super()
    this.id = id
  }

  readonly id: string
}
