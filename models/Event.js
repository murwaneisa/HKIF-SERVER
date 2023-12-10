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
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    attendeesIds: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'User',
      },
    ],
    benefits: [
      {
        type: String,
        required: true,
        enum: ['GAMES', 'FOOD', 'DRINK'],
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema, 'events')
