const mongoose = require('mongoose')

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    leadersIds: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'ActivityLeader',
      },
    ],
    membersIds: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'User',
      },
    ],
    schedules: [
      {
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Activity', activitySchema, 'activities')
