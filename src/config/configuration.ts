export default () => ({
	port: parseInt(process.env.PORT || '5000', 10),
	mongodbUri: process.env.MONGODB_URI,
	jwt: {
		secret: process.env.JWT_SECRET,
		accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
	},
})
