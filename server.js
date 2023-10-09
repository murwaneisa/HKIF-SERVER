const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')

db.connectToDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
