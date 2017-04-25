const assert = require('assert')
const Player = require('../players/models')
const User = require('../users/models')

let testUser = User.findOne({ username: 'testeroo' })
describe('Saving Players', () => {
	it('saves two players to the databased', done => {
		let player1 = new Player({
			playerName: 'Lil Johnny',
			isPitcher: 'test@test.com',
			inningPitching: 4,
			preferredPositions: [0, 1, 2],
			positionsToAvoid: [3, 4, 5],
			user: testUser._id,
			href: `${process.env.DOMAIN}/api/users/${testUser.username}/players/${this._id}`		
		})
		let player2 = new Player({
			playerName: 'Lil Sally',
			isPitcher: false,
			preferredPositions: [0, 2, 5],
			positionsToAvoid: [2, 3, 7],
			user: testUser.username,
			href: `${process.env.DOMAIN}/api/users/${testUser.username}/players/${this._id}`		
		})
		player1.save().then(() => {
			player2.save().then(() => {
				assert(player1.isNew === false)
				assert(player2.isNew === false)
				done()
			}).catch(error => {
				console.log(error)
			})
		}).catch(error => {
			console.log(error)
		})
	})
})