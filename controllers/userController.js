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
