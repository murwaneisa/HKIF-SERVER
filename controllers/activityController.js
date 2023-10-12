const Activity = require('../models/Activity')

exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.getById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.json(activity)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.create = async (req, res) => {
  try {
    const newActivity = new Activity(req.body)
    await newActivity.save()
    res.status(201).json({ message: 'Activity created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.update = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!activity) {
      return res.status(404).send('Activity not found')
    }
    res.json(activity)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.remove = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndRemove(req.params.id)
    if (!activity) {
      return res.status(404).send('Activity not found')
    }
    res.json({ message: 'Activity deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}
