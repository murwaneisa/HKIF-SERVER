const express = require('express')
const router = express.Router()
const boardMemberController = require('../controllers/boardMemberController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware(),
  //TODO: Decide which roles can create board member
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.create
)

router.get('/', boardMemberController.getAll)

router.get('/email/:email', boardMemberController.getByEmail)

router.get('/:id', boardMemberController.getById)

router.put(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can update board member
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.update
)

router.delete(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can delete board member
  checkPermission({
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  boardMemberController.remove
)

module.exports = router
