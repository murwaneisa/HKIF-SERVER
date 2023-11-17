const express = require('express')
const router = express.Router()
const blacklistedTokenController = require('../controllers/blacklistedTokenController')

router.post('/', blacklistedTokenController.create)

router.get('/', blacklistedTokenController.getAll)

router.get('/user/:userId', blacklistedTokenController.getByUserId)

router.get('/jti/:jti', blacklistedTokenController.getByJti)

router.put('/jti/:jti', blacklistedTokenController.update)

router.delete('/jti/:jti', blacklistedTokenController.remove)

module.exports = router
