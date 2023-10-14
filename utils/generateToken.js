const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const generateAccessToken = (info, type) => {
  const payload = {
    _id: info._id,
    ...(type === 'user' ? { membershipType: info.membershipType } : {}),
    ...(type === 'admin' ? { role: info.role } : {}),
  }
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (info, type) => {
  const payload = {
    _id: info._id,
    ...(type === 'user' ? { membershipType: info.membershipType } : {}),
    ...(type === 'admin' ? { role: info.role } : {}),
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 7, // Expires in 210 days
    jti: generateJti(), // JWT ID
  }

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
}

function generateJti() {
  // Generate a unique JWT ID. This could be a random string.
  // Ensure it's sufficiently random and complex to be unguessable.
  return crypto.randomBytes(16).toString('hex')
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
}
