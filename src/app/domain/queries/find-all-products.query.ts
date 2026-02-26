import { Query } from 'src/base/lib/domain/query.base'

type Props = {
  page: number
  limit: number
}

export class FindAllProductsQuery extends Query {
  constructor({ page, limit }: Props) {
    super()
    this.page = page
    this.limit = limit
  }

  readonly page: number
  readonly limit: number
}
