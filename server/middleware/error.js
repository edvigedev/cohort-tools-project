const { MongooseError } = require('mongoose')

function errorHandler(err, req, res, next) {
	console.error(`🚀 ~ errorHandler ~ err:`, err)

	const errorMessage =
		err.errorResponse?.errmsg || err.message || err._message

	// e.g. duplicate key error
	if (err.name === 'MongoServerError') {
		if (err.code === 11000) {
			return res.status(400).json({
				code: err.code,
				message: 'Email used by another user',
				error: err.errorResponse || err,
			})
		}
		return res.status(400).json({
			code: err.code,
			message: errorMessage,
			error: err.errorResponse || err,
		})
	}

	// Any Mongoose Errors, e.g. Validation Errors
	if (err instanceof MongooseError) {
		return res.status(400).json({
			code: err.name,
			message: errorMessage,
			error: err.errors || err,
		})
	}

	res.status(500).json({
		code: 'UnknownError',
		message: 'Something went wrong due to ' + errorMessage,
		error: err,
	})
}

function notFoundHandler(req, res, next) {
	// This middleware will run whenever the requested route is not found
	res.status(404).json({ message: 'This route does not exist: ' + req.url })
}

module.exports = { errorHandler, notFoundHandler }
