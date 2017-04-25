const express = require('express')
const usersRoutes = require('./users/routes')
const authRoutes = require('./auth/routes')
const playersRoutes = require('./players/routes')

const router = express.Router()


router.get('/', (req, res) => {
	res.json({
		users: `${process.env.DOMAIN}/api/users`
	})
})
router.use('/users', usersRoutes)
router.use('/auth', authRoutes)


module.exports = router