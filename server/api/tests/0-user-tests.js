const assert = require('assert')
const User = require('../users/models')

describe('Saving Users', () => {
	it('Saves a user to the databased', done => {
		let user = new User({
			username: 'testeroo',
			email: 'test@test.com',
			password: 'Test123!'
		})
		user.save().then(() => {
			assert(user.isNew === false)
			done()
		})
	})
})