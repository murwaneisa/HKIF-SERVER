const express = require('express')
const router = express.Router()
const boardMemberController = require('../controllers/boardMemberController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

// router.get('/email/:email', boardMemberController.getByEmail)

router.get('/public', boardMemberController.getAllPublic)

router.get('/public/:id', boardMemberController.getByIdPublic)

router.put(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.remove
)

router.post(
  '/',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.create
)

router.get(
  '/:id',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
  }),
  boardMemberController.getById
)

router.get(
  '/',
  authMiddleware(),
  checkPermission({
    adminOnly: true,
  }),
  boardMemberController.getAll
)

module.exports = router
