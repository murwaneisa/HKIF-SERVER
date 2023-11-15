const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.post('/', activityController.create)
router.get('/', activityController.getAll)

router.get('/:id', activityController.getById)
router.put('/:id', activityController.update)
router.delete('/:id', activityController.remove)

module.exports = router
