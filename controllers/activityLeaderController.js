const ActivityLeader = require('../models/ActivityLeader')

exports.getAll = async (req, res) => {
  try {
    const activityLeader = await ActivityLeader.find()
    res.json(activityLeader)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.id
    const activityLeader = await ActivityLeader.findById(id)
    if (!activityLeader) {
      return res.status(404).json({ message: 'Activity Leader not found' })
    }
    res.json(activityLeader)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getByEmail = async (req, res) => {
  try {
    const activityLeader = await ActivityLeader.findOne({
      email: req.params.email,
    })
    if (!activityLeader) {
      return res.status(404).json({ message: 'Activity Leader not found' })
    }
    res.json(activityLeader)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, imageUrl } = req.body
    const newActivityLeader = new ActivityLeader({
      firstName,
      lastName,
      email,
      imageUrl,
    })
    await newActivityLeader.save()
    res.status(201).json(newActivityLeader)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const { firstName, lastName, imageUrl, activityId } = req.body
    const activityLeader = await ActivityLeader.findByIdAndUpdate(
      id,
      { firstName, lastName, imageUrl, activityId },
      { new: true }
    )
    if (!activityLeader) {
      return res.status(404).json({ message: 'Activity Leader not found' })
    }
    res.json(activityLeader)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id
    const activityLeader = await ActivityLeader.findByIdAndRemove(id)
    if (!activityLeader) {
      return res.status(404).json({ message: 'Activity Leader not found' })
    }
    res.json({ message: 'Activity Leader deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
