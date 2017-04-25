const mongoose = require('mongoose')
const validator = require('validator')

const lineupSchema = new mongoose.Schema({

}, {
  timestamps: true
})

const Lineup = mongoose.model('Lineup', userSchema)

module.exports = Lineup