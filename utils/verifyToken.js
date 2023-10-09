function verifyToken(token, tokenType) {
  try {
    // Determine which secret to use
    const secret =
      tokenType === 'refresh'
        ? process.env.REFRESH_TOKEN_SECRET
        : process.env.ACCESS_TOKEN_SECRET

    // Decode and verify the token
    const decodedToken = jwt.verify(token, secret)

    // Check if jti is blacklisted for refresh tokens
    if (tokenType === 'refresh' && isJtiBlacklisted(decodedToken.jti)) {
      throw new Error('Token is blacklisted.')
    }
    return decodedToken
  } catch (error) {
    console.error('Token verification failed:', error)
  }
}
function isJtiBlacklisted(jti) {}
