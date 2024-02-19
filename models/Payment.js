const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
  {
    memberId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'SEK',
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['swish', 'creditCard'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'verified', 'failed'],
      default: 'pending',
    },
    swishInfo: {
      number: {
        type: String,
        validate: {
          validator: function (value) {
            return (
              this.paymentMethod !== 'swish' || (value != null && value != '')
            )
          },
          message: 'Swish number is required for Swish payments',
        },
      },
      legalName: {
        type: String,
        validate: {
          validator: function (value) {
            return (
              this.paymentMethod !== 'swish' || (value != null && value != '')
            )
          },
          message: 'Legal name is required for Swish payments',
        },
      },
    },
    stripeTransactionId: String, // Only populated for credit card payments
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    // verifiedByAdmin: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Admin',
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
)

paymentSchema.pre('save', function (next) {
  if (this.paymentMethod === 'swish') {
    if (
      !this.swishInfo ||
      !this.swishInfo.number ||
      !this.swishInfo.legalName
    ) {
      return next(new Error('Swish information is incomplete'))
    }
  } else if (this.paymentMethod === 'creditCard') {
    if (!this.stripeTransactionId) {
      return next(new Error('Stripe transaction ID is missing'))
    }
  }
  next()
})

module.exports = mongoose.model('Payment', paymentSchema, 'payments')
