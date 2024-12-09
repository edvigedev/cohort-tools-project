const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Sign up route

router.post('/signup', async (req, res, next) => {
	const { email, password, name } = req.body

	try {
		// Check if chosen email is unique
		// const emailAlreadyUsed = await User.findOne({ email })
		// if (emailAlreadyUsed)
		// 	throw new Error(`Email "${email}" is already used by another user.`)

		const salt = bcryptjs.genSaltSync(12)
		const hashedPassword = bcryptjs.hashSync(password, salt)

		// |||------------------------------
		// VVV IF NO USER LETS CREATE A USER
		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
		})

		res.status(201).json({
			message: 'New User successfully created.',
			newUser,
		})
		// ---------------------------------
	} catch (error) {
		next(error)
	}
})

//Login route

router.post('/login', async (req, res, next) => {
	const { email, password, name } = req.body

	try {
		const foundUser = await User.findOne({ email })
		console.log(req.body, foundUser, process.env.TOKEN_SECRET)

		if (foundUser) {
			const frontEndUserPassword = password
			const userINDBPassword = foundUser.password

			const passwordsMatch = bcryptjs.compareSync(
				frontEndUserPassword,
				userINDBPassword
			)

			if (passwordsMatch) {
				const { _id, name } = foundUser
				const currentUser = { _id, name }
				const authToken = jwt.sign(
					currentUser,
					process.env.TOKEN_SECRET,
					{
						algorithm: 'HS256',
						expiresIn: '1h',
					}
				)
				console.log('here is the auth token for you Pandua', authToken)
				res.status(200).json({
					message: 'User has logged in',
					authToken,
				})
			} else {
				const loginError = new Error('Invalid password credentials')
				loginError.statusCode = 400
				throw loginError
			}
		} else {
			const otherError = new Error('Invalid email credentials')
			otherError.statusCode = 400
			throw otherError
		}
	} catch (error) {
		next(error)
	}
})

router.get('/verify', isAuthenticated, (req, res, next) => {
	res.status(200).json({
		message: 'All Humans must be Verified!!!',
		currentUser: req.payLoad.currentUser,
	})
})

module.exports = router
