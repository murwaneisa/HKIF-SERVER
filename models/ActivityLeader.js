const mongoose = require('mongoose')

const activityLeaderSchema = new mongoose.Schema(
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
    imageUrl: {
      type: String,
      required: false,
    },
    activitiesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Activity',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  'ActivityLeader',
  activityLeaderSchema,
  'activityLeaders'
)
