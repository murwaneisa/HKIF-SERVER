const express = require('express')
const router = express.Router()
const blacklistedTokenController = require('../controllers/blacklistedTokenController')

router.post('/', blacklistedTokenController.create)
router.get('/', blacklistedTokenController.getAll)

router.put('/:id', blacklistedTokenController.update)
router.delete('/:id', blacklistedTokenController.remove)

module.exports = router
