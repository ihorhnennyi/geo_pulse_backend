import * as Joi from '@hapi/joi'

export const validationSchema = Joi.object({
	PORT: Joi.number().default(5000),
	MONGODB_URI: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
	JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
})
