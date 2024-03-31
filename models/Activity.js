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
        day: {
          type: Number,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
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
