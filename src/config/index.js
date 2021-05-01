require('dotenv').config();

const config = {
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_ACCESS_TOKEN_URL: process.env.GOOGLE_ACCESS_TOKEN_URL,
	GOOGLE_GET_USER_DATA: process.env.GOOGLE_GET_USER_DATA,
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 3000,
	DB_CONNECTION: process.env.DB_CONNECTION,
	jwt_secret: process.env.JWT_SECRET  || 'secret'
};

module.exports = { config };
