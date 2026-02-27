import { FindProductByIdQuery } from 'src/app/domain/queries/find-product-by-id.query'
import { FindProductByIdParamsDto } from '../dto/find-product-by-id.params.dto'

export class FindProductByIdMapper {
  static toDomain(params: FindProductByIdParamsDto): FindProductByIdQuery {
    return new FindProductByIdQuery({ id: params.id })
  }
}
