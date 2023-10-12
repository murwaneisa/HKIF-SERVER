const BoardMember = require('../models/BoardMember')

exports.getAll = async (req, res) => {
  try {
    const boardMembers = await BoardMember.find()
    console.log(boardMembers)
    res.json(boardMembers)
  } catch (err) {
    console.log(err)
  }
}

exports.getById = async (req, res) => {}

exports.create = async (req, res) => {}

exports.update = async (req, res) => {}

exports.remove = async (req, res) => {}
