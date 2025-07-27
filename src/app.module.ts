import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import configuration from './config/configuration'
import { validationSchema } from './config/validation'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './users/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validationSchema,
		}),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				uri: config.get<string>('mongodbUri'),
			}),
		}),
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
