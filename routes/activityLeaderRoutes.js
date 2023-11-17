const express = require('express')
const router = express.Router()
const activityLeaderController = require('../controllers/activityLeaderController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware(),
  //TODO: Decide which roles can create activity leader
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.create
)

router.get('/', activityLeaderController.getAll)

router.get('/email/:email', activityLeaderController.getByEmail)

router.get('/:id', activityLeaderController.getById)

router.put(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can update activity leader
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can delete activity leader
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.remove
)

module.exports = router
