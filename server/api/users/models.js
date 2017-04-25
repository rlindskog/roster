const mongoose = require('mongoose')
const validator = require('validator')
const Player = require('../players/models')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: [5, 'Username must be more than 5 characters.'],
		// maxlength: [20, 'Username must be less than 20 characters.']
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			isAsync: true,
			message: 'Invalid email.'
		},
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5
	},
	admin: {
		type: Boolean,
		default: false
	},
	href: String,
	players: String
},
{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User