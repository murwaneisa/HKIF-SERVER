const mongoose = require('mongoose')

const activityLeaderSchema = new mongoose.Schema({
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
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Activity',
  },
})

module.exports = mongoose.model('ActivityLeader', activityLeaderSchema)
