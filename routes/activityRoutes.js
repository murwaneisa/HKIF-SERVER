const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware(),
  //TODO: Decide which roles can create activity
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'ACTIVITY_MANAGER'],
  }),
  activityController.create
)

router.get('/', activityController.getAll)

router.get('/:id', activityController.getById)

router.put(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can update activity
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'ACTIVITY_MANAGER'],
  }),
  activityController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can delete activity
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN', 'ACTIVITY_MANAGER'],
  }),
  activityController.remove
)

module.exports = router
