const Event = require('../models/Event')

exports.getAll = async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.getById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.create = async (req, res) => {
  try {
    const newEvent = new Event(req.body)
    await newEvent.save()
    res.status(201).json(newEvent)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.update = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!event) {
      return res.status(404).send({ message: 'Event not found' })
    }
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.remove = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id)
    if (!event) {
      return res.status(404).send({ message: 'Event not found' })
    }
    res.json({ message: 'Event deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}
