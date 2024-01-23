const express = require('express')
const userController = require('../controllers/userController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)
router.post('/google-login', userController.googleLogin)

router.post('/request-password-reset', userController.requestPasswordReset)
router.post('/reset-password', userController.resetPassword)

router.put(
  '/edit/:id',
  authMiddleware(),
  checkPermission({
    userIdRequired: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  userController.editUser
)

router.get('/public', userController.getPublicUsers)

router.get('/public/:id', userController.getPublicUserById)

router.get(
  '/contacts',
  authMiddleware(),
  checkPermission({ adminOnly: true }),
  userController.getUsersContacts
)

router.get(
  '/contacts/:id',
  authMiddleware(),
  checkPermission({ userIdRequired: true }),
  userController.getUsersContactsById
)

router.get(
  '/',
  authMiddleware(),
  checkPermission({ adminOnly: true, requiredRoles: ['SUPERADMIN'] }),
  userController.getAllUsers
)

router.get(
  '/:id',
  authMiddleware(),
  checkPermission({ userIdRequired: true, requiredRoles: ['SUPERADMIN'] }),
  userController.getUserById
)

module.exports = router
