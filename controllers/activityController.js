const Activity = require('../models/Activity')

exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.find()
    console.log(activities)
    res.json(activities)
  } catch (err) {
    console.log(err)
  }
}

exports.getById = async (req, res) => {}

exports.create = async (req, res) => {}

exports.update = async (req, res) => {}

exports.remove = async (req, res) => {}
