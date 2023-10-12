const Activity = require('../models/Activity')

exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.getById = async (req, res) => {}

exports.create = async (req, res) => {
  try {
    const newActivity = new Activity(req.body)
    await newActivity.save()
    res.status(201).json({ message: 'Activity created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.update = async (req, res) => {}

exports.remove = async (req, res) => {}
