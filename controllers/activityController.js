const { Types } = require('mongoose')
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
      return res.status(404).json({ message: 'Activity not found' })
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
      return res.status(404).send({ message: 'Activity not found' })
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
      return res.status(404).send({ message: 'Activity not found' })
    }
    res.json({ message: 'Activity deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err })
  }
}

exports.toggleMember = async (req, res) => {
  const { id, memberId } = req.params

  try {
    // Find the activity by ID
    const activity = await Activity.findById(id)

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' })
    }

    // Ensure memberId is a valid ObjectId
    if (!Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: 'Invalid member ID' })
    }

    // Check if the member exists in the activity's membersIds array
    const memberIndex = activity.membersIds.indexOf(memberId)
    if (memberIndex === -1) {
      // Member not found, add them
      activity.membersIds.push(memberId)
      await activity.save()
      return res
        .status(200)
        .json({ message: 'Member added successfully', activity })
    } else {
      // Member found, remove them
      activity.membersIds.splice(memberIndex, 1)
      await activity.save()
      return res
        .status(200)
        .json({ message: 'Member removed successfully', activity })
    }
  } catch (err) {
    console.error('Error toggling member for activity:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
