const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
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
      required: false,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    membershipType: {
      type: String,
      required: true,
      enum: [
        'GUEST',
        'AWAITING_VERIFICATION',
        'BASIC_MEMBERSHIP',
        'FULL_MEMBERSHIP',
      ],
    },
    role: {
      type: String,
      required: true,
      enum: ['ACTIVITY_LEADER', 'BOARD_MEMBER', 'NONE'],
    },
    favsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Activity',
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

module.exports = mongoose.model('User', userSchema, 'users')
