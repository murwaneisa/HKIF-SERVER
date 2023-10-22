const express = require('express')
const adminController = require('../controllers/adminController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

const router = express.Router()

router.post(
  '/register',
  authMiddleware(),
  checkPermission({
    userIdRequired: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  adminController.registerAdmin
)
router.post('/login', adminController.loginAdmin)
router.put(
  '/edit/:id',
  authMiddleware(),
  checkPermission({
    userIdRequired: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  adminController.editAdmin
)
router.get('/public', adminController.getPublicAdmins)
router.get('/public/:id', adminController.getPublicAdminById)
router.get(
  '/',
  authMiddleware(),
  //TODO: Decide which roles can access full data
  checkPermission({ adminOnly: true }),
  adminController.getAllAdmins
)
router.get(
  '/:id',
  authMiddleware(),
  //TODO: Decide which roles can access full data
  checkPermission({ adminIdRequired: true }),
  adminController.getAdminById
)

module.exports = router
