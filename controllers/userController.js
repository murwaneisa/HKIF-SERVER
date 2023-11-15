const User = require('../models/User')
const bcrypt = require('bcrypt')

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken')

const SALT_ROUNDS = 10

exports.registerUser = async (req, res) => {
  try {
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
    res.json({ access: accessToken, refresh: refreshToken })
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
    const users = await User.find({}).select('-password')
    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
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
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
