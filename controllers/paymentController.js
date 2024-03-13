const Payment = require('../models/Payment')
const User = require('../models/User')

exports.verifyUserPayment = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)

    let updatedMembershipType
    if (user.membershipType === 'AWAITING_VERIFICATION_BASIC_MEMBERSHIP') {
      updatedMembershipType = 'BASIC_MEMBERSHIP'
    } else if (
      user.membershipType === 'AWAITING_VERIFICATION_FULL_MEMBERSHIP'
    ) {
      updatedMembershipType = 'FULL_MEMBERSHIP'
    } else {
      return res
        .status(400)
        .json({ message: 'User membership is not awaiting verification.' })
    }

    // Find the payment associated with the user
    const payment = await Payment.findOne({ memberId: userId })

    if (!payment) {
      return res
        .status(404)
        .json({ message: 'Payment not found for the user.' })
    }

    // Update membership-type in users collection
    const updatedUser = await User.findByIdAndUpdate(userId, {
      membershipType: updatedMembershipType,
    })

    // Update payment status in payments collection
    await Payment.findByIdAndUpdate(payment._id, {
      status: 'verified',
    })

    res.status(200).json({
      membershipType: updatedUser.membershipType,
      message: 'Payment verified successfully.',
    })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.declineUserPayment = async (req, res) => {
  try {
    const userId = req.params.userId

    // Find the payment associated with the user
    const payment = await Payment.findOne({ memberId: userId })

    if (!payment) {
      return res
        .status(404)
        .json({ message: 'Payment not found for the user.' })
    }

    // Update membership-type in users collection
    const updatedUser = await User.findByIdAndUpdate(userId, {
      membershipType: 'UNPAID',
    })

    // Update payment status in payments collection
    await Payment.findByIdAndUpdate(payment._id, {
      status: 'failed',
    })

    res.status(200).json({
      membershipType: updatedMembershipType,
      message: 'Payment declined successfully.',
    })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}
