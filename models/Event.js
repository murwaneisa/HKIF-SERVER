const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
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
    price: {
      type: Double,
      required: true,
    },
    date: {
      type: Date,
      requried: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    attendeesIds: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
