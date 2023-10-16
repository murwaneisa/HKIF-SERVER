const User = require('../models/User')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken')

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
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
    if (!user || user.password !== password) {
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
    const user = await User.findByIdAndUpdate(userId, updates, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
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
