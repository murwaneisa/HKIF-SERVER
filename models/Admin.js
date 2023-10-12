const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        required: true,
        enum: ['SUPERADMIN', 'ACTIVITY_MANAGER', 'EVENT_MANAGER'],
      },
    ],
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Admin', adminSchema)
