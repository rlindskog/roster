const express = require('express')
const controllers = require('./controllers')

const router = express.Router()

router.route('/')
	.get(controllers.auth.get)
	.post(controllers.auth.post)

module.exports = router