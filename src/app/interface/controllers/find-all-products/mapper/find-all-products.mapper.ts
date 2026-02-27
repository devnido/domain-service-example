import { FindAllProductsQuery } from 'src/app/domain/queries/find-all-products.query'
import { FindAllProductQueryParamsDto } from '../dto/find-all-product.query-params.dto'

export class FindAllProductsMapper {
  static toDomain(params: FindAllProductQueryParamsDto): FindAllProductsQuery {
    return new FindAllProductsQuery({
      page: Number(params.page),
      limit: Number(params.limit),
    })
  }
}
