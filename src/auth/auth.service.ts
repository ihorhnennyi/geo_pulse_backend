import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserService } from '../users/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async register(dto: RegisterDto) {
		const hash = await bcrypt.hash(dto.password, 10)
		const user = await this.userService.create({ ...dto, password: hash })
		return this.generateTokens(user)
	}

	async login(dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email)
		if (!user || !(await bcrypt.compare(dto.password, user.password))) {
			throw new UnauthorizedException('Invalid credentials')
		}
		return this.generateTokens(user)
	}

	async refresh(user: any) {
		const dbUser = await this.userService.findById(user.sub)
		return this.generateTokens(dbUser)
	}

	private generateTokens(user: any) {
		const payload = { sub: user._id, email: user.email, role: user.role }
		return {
			accessToken: this.jwtService.sign(payload, {
				expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
			}),
			refreshToken: this.jwtService.sign(payload, {
				expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
			}),
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		}
	}
}
