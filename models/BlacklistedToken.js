const mongoose = require('mongoose')

const blacklistedTokenSchema = mongoose.Schema(
  {
    jti: {
      type: String,
      required: true,
      unique: true,
    },
    reason: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  'BlacklistedToken',
  blacklistedTokenSchema,
  'blacklistedTokens'
)
