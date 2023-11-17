const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware(),
  //TODO: Decide which roles can create event
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'EVENT_MANAGER'],
  }),
  eventController.create
)

router.get('/', eventController.getAll)

router.get('/:id', eventController.getById)

router.put(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can update event
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'EVENT_MANAGER'],
  }),
  eventController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can delete event
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'EVENT_MANAGER'],
  }),
  eventController.remove
)

module.exports = router
