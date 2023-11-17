const express = require('express')
const router = express.Router()
const boardMemberController = require('../controllers/boardMemberController')

router.post('/', boardMemberController.create)

router.get('/', boardMemberController.getAll)

router.get('/email/:email', boardMemberController.getByEmail)

router.get('/:id', boardMemberController.getById)

router.put('/:id', boardMemberController.update)

router.delete('/:id', boardMemberController.remove)

module.exports = router
