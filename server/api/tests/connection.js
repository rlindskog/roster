require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before(done => {
	mongoose.connect(process.env.DATABASE)
  mongoose.connection.once('open', () => {
  	console.log('Connection has been made.')
  	mongoose.connection.collections.users.drop(() => {
			done()
		})
  }).on('error', error => {
    console.log('Connection error:', error)
  })
})

beforeEach(done => {
	mongoose.connection.collections.users.drop(() => {
		mongoose.connection.collections.players.drop(() => {
			done()
		})
	})
})

after(done => {
	mongoose.connection.close(() => {
		done()
	})
})