const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../users/models')
const { filterSensitive } = require('../../util')

module.exports = {
	auth: {
		get(req, res) {
			res.json({message: 'This is the auth api!'})
		},
		post(req, res) {

			let { username, password } = req.body

			User.findOne({ username }).then(user => {
				// console.log(user)
				let hashedPassword = user.password
				bcrypt.compare(password, hashedPassword).then(matched => {
			    if (!user) {
						res.status(404).json({
							message: 'Authentication failed, can\'t find user'
						})
					} else if (!matched) {
						res.status(404).json({
							message: 'Authntication failed. Wrong password'
						})
					} else {
						user = filterSensitive(user)
						let token = jwt.sign(user, process.env.SECRET, {
							expiresIn: 60 * 60 * 24 * 30 // 30 days 
						})
						res.status(200).json({
							message: 'Enjoy your token!',
							token,
							user
						})
					}
				}).catch(error => {
					console.log(error)
					res.status(500).json({
						error
					})
				})
			})
		}
	}
}