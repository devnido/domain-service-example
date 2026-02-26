import { ApiProperty } from '@nestjs/swagger'

type Props = {
  message: string
}

export class SuccessResponseDto {
  constructor({ message }: Props) {
    this.message = message
  }

  @ApiProperty({
    example: 'Request processed successfully',
    description: 'Message of the success response',
    required: true,
  })
  readonly message: string
}
