const express = require('express')
const router = express.Router()
const activityLeaderController = require('../controllers/activityLeaderController')

router.post('/', activityLeaderController.create)

router.get('/', activityLeaderController.getAll)

router.get('/email/:email', activityLeaderController.getByEmail)

router.get('/:id', activityLeaderController.getById)

router.put('/:id', activityLeaderController.update)

router.delete('/:id', activityLeaderController.remove)

module.exports = router
