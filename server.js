const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const db = require('./configs/db')

const app = express()
const port = process.env.PORT

db.connectToDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})
