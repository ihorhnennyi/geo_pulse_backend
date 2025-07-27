import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty({ example: '64f2345671a234...' })
	id: string

	@ApiProperty({ example: 'John Doe' })
	name: string

	@ApiProperty({ example: 'john@example.com' })
	email: string

	@ApiProperty({ example: 'user' })
	role: string
}
