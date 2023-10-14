const blacklistedToken = require('../models/BlacklistedToken')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Admin = require('../models/Admin')

async function verifyToken(token, tokenType) {
  try {
    // Determine which secret to use
    const secret =
      tokenType === 'refresh'
        ? process.env.REFRESH_TOKEN_SECRET
        : process.env.ACCESS_TOKEN_SECRET

    // Decode and verify the token
    const decodedToken = jwt.verify(token, secret)

    // Check if jti is blacklisted for refresh tokens
    if (tokenType === 'refresh') {
      if (await isJtiBlacklisted(decodedToken.jti)) {
        throw new Error('Token is blacklisted.')
      }

      // Verify if the refresh token matches the one in the database
      const model = decodedToken.role ? Admin : User
      const userOrAdmin = await model.findById(decodedToken._id)
      if (!userOrAdmin || userOrAdmin.refreshToken !== token) {
        throw new Error('Invalid refresh token.')
      }
    }
    return decodedToken
  } catch (error) {
    throw new Error('Token verification failed:', error)
  }
}
async function isJtiBlacklisted(jti) {
  try {
    // Find the blacklisted token by its jti
    const token = await blacklistedToken.findOne({ jti: jti })

    // If no such token exists, it's not blacklisted
    if (!token) {
      return false
    }

    // Check if the token has expired
    const now = new Date()
    if (token.expiresAt < now) {
      // A delayed ban
      return false
    }

    // If we reach here, the token is blacklisted
    return true
  } catch (err) {
    throw new Error('Error checking if JTI is blacklisted:', err)
  }
}

module.exports = { verifyToken }
