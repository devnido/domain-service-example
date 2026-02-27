import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class FindProductByIdParamsDto {
  @ApiProperty({ example: '123456', description: 'Product ID' })
  @IsString()
  id: string
}
