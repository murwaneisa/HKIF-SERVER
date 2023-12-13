const express = require('express')
const router = express.Router()
const activityLeaderController = require('../controllers/activityLeaderController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.get('/public', activityLeaderController.getAllPublic)

router.get('/public/:id', activityLeaderController.getByIdPublic)

router.get(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
  }),
  activityLeaderController.getById
)

router.put(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.remove
)

router.get(
  '/',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
  }),
  activityLeaderController.getAll
)

router.post(
  '/',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  activityLeaderController.create
)
// router.get('/email/:email', activityLeaderController.getByEmail)

module.exports = router
