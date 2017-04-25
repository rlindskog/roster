const mongoose = require('mongoose')
const validator = require('validator')

const playerSchema = new mongoose.Schema({
	playerName: {
		type: String,
		maxLength: 120,
		unique: true,
		required: true
	},
	isPitcher: {
		type: Boolean,
		default: true,
		required: true
	},
	inningPitching: {
		type: Number,
		required: function() {
			return this.pitcher
		},
		get: v => Math.floor(v),
		set: v => Math.floor(v),
		min: 1,
		max: 6
	},
	// postions <= 5 are in field
	preferredPositions: [{
			type: Number,
			required: function() {
				return this.pitcher
			},
			get: v => Math.floor(v),
			set: v => Math.floor(v),
			min: 0,
			max: 8
		}],
	// postions <= 5 are in field
	positionsToAvoid: [{
			type: Number,
			required: function() {
				return this.pitcher
			},
			get: v => Math.floor(v),
			set: v => Math.floor(v),
			min: 0,
			max: 8
		}],
	_creator: {
		type: String,
		ref: 'User'
	},
	href: String
}, {
  timestamps: true
})

const Player = mongoose.model('Players', playerSchema)


module.exports = Player