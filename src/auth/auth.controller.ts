import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@Post('refresh')
	refresh(@CurrentUser() user: any) {
		return this.authService.refresh(user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getMe(@CurrentUser() user: any) {
		return user
	}
}
