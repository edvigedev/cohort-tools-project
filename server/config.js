const dotenv = require('dotenv');
dotenv.config();

const config = {
	PORT: process.env.PORT || 5005,
	MONGO_URI:
		process.env.MONGO_URI || 'mongodb://localhost:27017/cohort-tools-api',
};

module.exports = config;
