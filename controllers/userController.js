const User = require('../models/User')
const ActivityLeader = require('../models/ActivityLeader')
const BoardMember = require('../models/BoardMember')
const bcrypt = require('bcrypt')
const { sendVerificationEmail } = require('../utils/emailService')
const { generateRandomCode } = require('../utils/generateRandomCode')

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken')

const { OAuth2Client } = require('google-auth-library')
const SALT_ROUNDS = 10

async function verifyGoogleToken(client, clientId, token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: clientId,
    })
    const payload = ticket.getPayload()
    return payload // This contains user info like email, name, etc.
  } catch (error) {
    console.error('Error verifying Google token', error)
    return null
  }
}

exports.googleLogin = async (req, res) => {
  try {
    const { idToken, clientId } = req.body
    const client = new OAuth2Client(clientId)
    const verifiedUser = await verifyGoogleToken(client, clientId, idToken)
    if (!verifiedUser) {
      return res.status(401).json({ message: 'Invalid Google ID token' })
    }
    // Check if email exists in the database
    const user = await User.findOne({ email: verifiedUser.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Generate tokens (assuming you have functions for this)
    const accessToken = generateAccessToken(user, 'user')
    const refreshToken = generateRefreshToken(user, 'user')

    // Update user with refreshToken and return tokens
    user.refreshToken = refreshToken
    await user.save()
    res.json({ userId: user._id, access: accessToken, refresh: refreshToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.registerUser = async (req, res) => {
  try {
    const { role, email } = req.body

    if ((role === 'ACTIVITY_LEADER' || role === 'BOARD_MEMBER') && email) {
      const model = role === 'ACTIVITY_LEADER' ? ActivityLeader : BoardMember
      const existingUser = await model.findOne({ email })

      if (!existingUser) {
        return res.status(400).json({
          message: 'User does not exist in the database for the selected role',
        })
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const accessToken = generateAccessToken(user, 'user')
    const refreshToken = generateRefreshToken(user, 'user')
    user.refreshToken = refreshToken
    await user.save()
    res.json({ userId: user._id, access: accessToken, refresh: refreshToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id
    const updates = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (updates.currentPassword && updates.newPassword) {
      // Verify the current password
      const isMatch = await bcrypt.compare(
        updates.currentPassword,
        user.password
      )
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: 'Current password is incorrect' })
      }

      // Hash the new password and update it
      const hashedPassword = await bcrypt.hash(updates.newPassword, SALT_ROUNDS)
      updates.password = hashedPassword
    }

    // Remove currentPassword and newPassword from updates to avoid saving them as fields
    delete updates.currentPassword
    delete updates.newPassword

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    })
    res.json({ message: 'User updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .select('-refreshToken')
    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .select('-refreshToken')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // If admin or same user, return all data
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getPublicUsers = async (req, res) => {
  try {
    const users = await User.find({})
    const limitedUsers = users.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    }))
    return res.status(200).json(limitedUsers)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getPublicUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getUsersContacts = async (req, res) => {
  try {
    const users = await User.find({})
    const limitedUsers = users.map(user => {
      const userLimitedInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl,
      }
      if (user.phoneNumber) {
        userLimitedInfo.phoneNumber = user.phoneNumber
      }
      return userLimitedInfo
    })

    return res.status(200).json(limitedUsers)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getUsersContactsById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const userLimitedInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
    }
    if (user.phoneNumber) {
      userLimitedInfo.phoneNumber = user.phoneNumber
    }
    return res.status(200).json(userLimitedInfo)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const verificationCode = generateRandomCode()
    const expirationTime = new Date()
    // console.log('Before adjustment:', expirationTime.toLocaleString())
    expirationTime.setHours(expirationTime.getHours() + 1)
    // console.log('After adjustment:', expirationTime.toLocaleString())

    user.verificationCode = verificationCode
    user.verificationCodeExpires = expirationTime
    await user.save()

    sendVerificationEmail(email, verificationCode)

    res.status(200).json({ message: 'Verification code sent to email' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { email, verificationCode, newPassword } = req.body
    // console.log(email, verificationCode, newPassword)
    const user = await User.findOne({
      email,
      verificationCode,
      verificationCodeExpires: { $gt: new Date() },
    })
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired verification code' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)
    user.password = hashedPassword
    user.verificationCode = null
    user.verificationCodeExpires = null
    await user.save()

    res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
