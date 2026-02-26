import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class CreateProductRequestDto {
  @ApiProperty({ example: 'Product name', description: 'Product name' })
  @MaxLength(50)
  @MinLength(2)
  @IsString()
  name: string

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @MaxLength(255)
  @MinLength(10)
  @IsString()
  description: string

  @ApiProperty({ example: 100, description: 'Product price' })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number
}
