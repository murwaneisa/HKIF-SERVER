const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const {
  authMiddleware,
  checkPermission,
} = require('../middlewares/authMiddleware')

router.post(
  '/verify/:userId',
  authMiddleware(),
  checkPermission({ adminOnly: true, requiredRoles: ['SUPERADMIN'] }),
  paymentController.verifyUserPayment
)

router.post(
  '/decline/:userId',
  authMiddleware(),
  checkPermission({ adminOnly: true, requiredRoles: ['SUPERADMIN'] }),
  paymentController.declineUserPayment
)

module.exports = router
