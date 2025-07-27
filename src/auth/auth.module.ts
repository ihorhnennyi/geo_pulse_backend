import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessStrategy } from './strategies/access.strategy'
import { RefreshStrategy } from './strategies/refresh.strategy'

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
