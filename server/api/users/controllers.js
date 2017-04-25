const User = require('./models')
const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId
const { authenticate } = require('../../middleware/auth-middleware')
const { filterSensitive } = require('../../util')

module.exports = {
	users: {
		get(req, res) {
			console.log(req.url)
			// console.log(req.user)
			// if (req.user.admin) {
				User.find({}).then(users => {
				res.status(200).json(users)
				}).catch(error => {
					res.status(500).json({ error })
				}) 
			// } else {
			// 	res.status(400).json({
			// 		message: 'Must be an admin to see all users.'
			// 	})
			// }
		},
		post(req, res) {
			const { username, email, password } = req.body
			// hash the password with 10 rounds of salt.
			console.log(req.body)
			bcrypt.hash(password, 10).then(hashedPassword => {
				// create new instance of user
				console.log(password)
				const user = new User({
					username,
					email,
					password: hashedPassword,
					href: `${process.env.DOMAIN}/api/users/${username}`,
					players: `${process.env.DOMAIN}/api/users/${username}/players`
				})
					// save it
				user.save().then(user => {
					user = filterSensitive(user)
					res.json(user)
				}).catch(error => {
					console.log(error)
					res.status(500).json({ error })
				})
			}).catch(error => {
				console.log(error)
				res.status(500).json({ error })
			})
		},
		put(req, res) {
			res.json({
				message: 'put users'
			})
		}
	},
	username: {
		get(req, res) {
			let username = req.params.username
			if (req.user.username === username) {
				User.findOne({ username }).then(user => {
					if (user) {
						user = filterSensitive(user)
						res.status(200).json(user)
					} else {
						res.status(404).json({ error: 'User not found.' })
					}
					
				}).catch(error => {
					console.log(error)
					res.status(500).json({ error })
				})
			} else {
				res.status(400).json({
					message: 'Log in to see profile: ' + username
				})
			}
			
		},
		delete(req, res) {
			res.json({
				message: 'delete userId'
			})
		}
	},
	current: {
		get(req, res) {
			if (req.json) {
				res.json(filterSensitive(req.user))
			} else {
				res.status(400).json({
					error: 'No user logged in.'
				})
			}
		}
	}
}