import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(dto: CreateUserDto): Promise<User> {
		return this.userModel.create(dto)
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ email })
	}

	async findById(id: string): Promise<User> {
		const user = await this.userModel.findById(id)
		if (!user) throw new NotFoundException('User not found')
		return user
	}
}
