const BoardMember = require('../models/BoardMember')

const getAll = async (req, res) => {
  try {
    const boardMembers = await BoardMember.find()
    console.log(boardMembers)
    res.json(boardMembers)
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
