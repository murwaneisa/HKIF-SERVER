const BlacklistedToken = require('../models/BlacklistedToken')

exports.getAll = async (req, res) => {
  try {
    const blacklistedTokens = await BlacklistedToken.find()
    res.json(blacklistedTokens)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.getByUserId = async (req, res) => {
  try {
    const blacklistedTokens = await BlacklistedToken.find({
      userId: req.params.userId,
    })
    res.json(blacklistedTokens)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.getByJti = async (req, res) => {
  try {
    const blacklistedToken = await BlacklistedToken.findOne({
      jti: req.params.jti,
    })
    if (!blacklistedToken) {
      return res.status(404).json({ message: 'Token not found' })
    }
    res.json(blacklistedToken)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.create = async (req, res) => {
  try {
    const newBlacklistedToken = new BlacklistedToken(req.body)
    await newBlacklistedToken.save()
    res.status(201).json({ message: 'BlacklistedToken created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.update = async (req, res) => {
  try {
    const blacklistedToken = await BlacklistedToken.findOneAndUpdate(
      { jti: req.params.jti },
      req.body,
      {
        new: true,
      }
    )
    if (!blacklistedToken) {
      return res.status(404).send({ message: 'Token not found' })
    }
    res.json(blacklistedToken)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.remove = async (req, res) => {
  try {
    const blacklistedToken = await BlacklistedToken.findOneAndRemove({
      jti: req.params.jti,
    })
    if (!blacklistedToken) {
      return res.status(404).send({ message: 'Token not found' })
    }
    res.json({ message: 'BlacklistedToken deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}
