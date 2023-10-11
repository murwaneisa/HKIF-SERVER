const Activity = require('../models/Activity')

const getAll = async (req, res) => {
  try {
    const activities = await Activity.find()
    console.log(activities)
    res.json(activities)
  } catch (err) {
    console.log(err)
  }
}

const getById = async (req, res) => {}

const create = async (req, res) => {}

const update = async (req, res) => {}

const remove = async (req, res) => {}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
