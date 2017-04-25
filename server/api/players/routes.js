const express = require('express')
const { authenticate } = require('../../middleware/auth-middleware')
const { players, playerId } = require('./controllers')

const router = express.Router({ mergeParams: true })
router.use(authenticate)

router.get('/', players.get)
router.post('/', players.post)

router.get('/:playerId', playerId.get)
router.delete('/:playerId', playerId.delete)


module.exports = router
