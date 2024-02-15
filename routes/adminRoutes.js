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
    adminOnly: true,
    requiredRoles: ['SUPERADMIN'],
  }),
  adminController.registerAdmin
)

router.post('/login', adminController.loginAdmin)

router.put(
  '/edit/:id',
  authMiddleware(),
  checkPermission({
    // Non-super admins can only edit the information of their own account
    adminOnly: true,
    adminIdRequired: true,
  }),
  adminController.editAdmin
)

router.get(
  '/contacts',
  authMiddleware(),
  checkPermission({ adminOnly: true }),
  adminController.getAdminContacts
)
router.get(
  '/contacts/:id',
  authMiddleware(),
  checkPermission({ adminOnly: true }),
  adminController.getAdminContactById
)

router.get(
  '/:id',
  authMiddleware(),
  checkPermission({ adminOnly: true, adminIdRequired: true }),
  adminController.getAdminById
)

router.delete(
  '/:id',
  authMiddleware(),
  checkPermission({ adminOnly: true, requiredRoles: ['SUPERADMIN'] }),
  adminController.deleteAdmin
)

router.get(
  '/',
  authMiddleware(),
  checkPermission({ adminOnly: true, requiredRoles: ['SUPERADMIN'] }),
  adminController.getAllAdmins
)

module.exports = router
