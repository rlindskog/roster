const Player = require('./models')
const User = require('../users/models')

function isUser(req) {
	return req.user.username == req.params.username
}

module.exports = {
	players: {
		get(req, res) {
			if (isUser(req)) {
				console.log(req.user.username)
				let _creator = req.user._id
				console.log(_creator)
				Player.find({ _creator }).then(players => {
					console.log(players)
					res.status(200).json(players)
				}).catch(error => {
					res.status(500).json(error)
				})
			} else {
				res.status(400).json({
					message: 'Not correct user...'
				})
			}
		},
		post(req, res) {
			if (isUser(req)) {
				let _creator = req.user._id
				User.findById(_creator).then(user => {
					let {
						playerName,
						isPitcher,
						inningPitching,
						preferredPositions,
						positionsToAvoid,
					} = req.body

					let player = new Player({
						playerName,
						isPitcher,
						inningPitching,
						preferredPositions,
						positionsToAvoid,
						href: `${process.env.DOMAIN}/api/users/${user.username}/players/${_creator}`,
						_creator,
					})

					player.save().then(player => {
						res.status(200).json(player)
					}).catch(error => {
						res.status(500).json({ error })
					})
				})
				
				// User.findById(userId).then(user => {
				// 	user.players.push({
				// 		playerName,
				// 		isPitcher,
				// 		inningPitching,
				// 		preferredPositions,
				// 		positionsToAvoid,
				// 		user: user.href
				// 		href: `${process.env.DOMAIN}/api/users/${user.username}/players/`
				// 	})
				// 	user.save()
				// 	res.status(200).json(player)
				// }).catch(error => {
				// 	res.status(500).json({ error })
				// })

				
			} else {
				res.status(400).json({
					message: 'Not correct user...' 
				})
			}			
		}
	},
	playerId: {
		get(req, res) {
			if (isUser(req)) {
				let _id = req.body.playerId
				Player.findOne({ _id }, player => {
					res.json(player)
				})
			} else {
				res.status(400).json({
					message: 'Not correct user...' 
				})
			}
		},
		delete(req, res) {
			if (isUser(req)) {
				Player.remove({ _id }).catch(error => {
					if (!error) {
						res.status(200).json({
							message: 'Successfully deleted Player'
						})
					} else {
						res.status(500).json({ error })
					}
				})
			} else {
				res.status(400).json({
					message: 'Not correct user...' 
				})
			}
		}
	}
}