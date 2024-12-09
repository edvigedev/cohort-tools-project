const router = require('express').Router()
const User = require('../models/User')

router.get('/:userId', async (req, res) => {
	let userId = req.params.userId

	try {
		let foundUser = await User.findById(userId).lean()
		let withOutPass = { ...foundUser, password: 'notinhg' }
		res.status(200).json({ user: withOutPass })
	} catch (error) {
		res.status(500).json({ message: 'not found!' })
	}
})

module.exports = router
