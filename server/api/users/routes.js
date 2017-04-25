const express = require('express')
const { users, username, current } = require('./controllers')
const { authenticate } = require('../../middleware/auth-middleware')
const playersRoutes = require('../players/routes')
const router = express.Router()

router.post('/', users.post)
router.get('/', authenticate, users.get)
router.put('/', users.post)

router.get('/current', current.get)

router.get('/:username', authenticate, username.get)
router.delete('/:username', authenticate, username.delete)

router.use('/:username/players', authenticate, playersRoutes)

module.exports = router
