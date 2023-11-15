const BoardMember = require('../models/BoardMember')

exports.getAll = async (req, res) => {
  try {
    const boardMembers = await BoardMember.find()
    res.json(boardMembers)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.id
    const boardMember = await BoardMember.findById(id)
    if (!boardMember) {
      return res.status(404).json({ message: 'Board Member not found' })
    }
    res.json(boardMember)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, imageUrl, position } = req.body
    const newBoardMember = new BoardMember({
      firstName,
      lastName,
      email,
      imageUrl,
      position,
    })
    await newBoardMember.save()
    res.status(201).json(newBoardMember)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const { firstName, lastName, email, imageUrl, position } = req.body
    const boardMember = await BoardMember.findByIdAndUpdate(
      id,
      { firstName, lastName, email, imageUrl, position },
      { new: true }
    )
    if (!boardMember) {
      return res.status(404).json({ message: 'Board Member not found' })
    }
    res.json(boardMember)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id
    const boardMember = await BoardMember.findByIdAndRemove(id)
    if (!boardMember) {
      return res.status(404).json({ message: 'Board Member not found' })
    }
    res.json({ message: 'Board Member deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
