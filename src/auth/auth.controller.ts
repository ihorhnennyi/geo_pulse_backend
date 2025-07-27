import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { UserDto } from '../users/dto/user.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({ status: 201, description: 'User registered' })
	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ status: 200, description: 'User logged in' })
	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Refresh access token' })
	@ApiResponse({ status: 200 })
	@Post('refresh')
	refresh(@CurrentUser() user: any) {
		return this.authService.refresh(user)
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get current user' })
	@ApiResponse({ status: 200, type: UserDto })
	@Get('me')
	getMe(@CurrentUser() user: any) {
		return user
	}
}
