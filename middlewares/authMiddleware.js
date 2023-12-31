const { generateAccessToken } = require('../utils/generateToken') // Import your token functions
const { verifyToken } = require('../utils/verifyToken')

exports.authMiddleware = () => {
  return async function (req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1]
    const refreshToken = req.headers['x-refresh-token']

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token is required' })
    }

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' })
    }
    try {
      const decoded = await verifyToken(accessToken, 'access')
      req.user = decoded
      return next() // Use return to exit immediately after calling next()
    } catch (error) {
      if (error.message === 'Token verification failed:') {
        try {
          const decodedRefreshToken = await verifyToken(refreshToken, 'refresh')
          const newAccessToken = generateAccessToken(
            decodedRefreshToken,
            decodedRefreshToken.role ? 'admin' : 'user'
          )
          res.setHeader('x-new-access-token', newAccessToken)
          req.user = decodedRefreshToken
          return next() // Use return to exit immediately after calling next()
        } catch (refreshError) {
          console.error(refreshError)
          return res.status(401).json({ message: 'Refresh Token Invalid' }) // Use return to exit immediately
        }
      }
      return res.status(401).json({ message: 'Unauthorized' }) // Use return to exit immediately
    }
  }
}

exports.checkPermission = ruleset => {
  return async function (req, res, next) {
    if (req.user.membershipType) {
      // This is a user
      if (
        (ruleset.userIdRequired && req.user._id !== req.params.id) ||
        ruleset.adminOnly
      ) {
        return res.status(403).json({ message: 'Forbidden' })
      }
    } else {
      // This is an admin
      if (
        // Either with the same id or super admin
        (ruleset.adminIdRequired &&
          !req.user.role.includes('SUPERADMIN') &&
          req.user._id !== req.params.id) ||
        (ruleset.requiredRoles &&
          !req.user.role.some(role => ruleset.requiredRoles.includes(role)))
      ) {
        return res.status(403).json({ message: 'Forbidden' })
      }
    }
    next()
  }
}
