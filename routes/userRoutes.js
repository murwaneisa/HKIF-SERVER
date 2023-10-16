const express = require('express')
const userController = require('../controllers/userController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
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
  '/',
  authMiddleware(),
  //TODO: Decide which roles can access full data
  checkPermission({ adminOnly: true }),
  userController.getAllUsers
)
router.get(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can access full data
  checkPermission({ userIdRequired: true }),
  userController.getUserById
)

module.exports = router
