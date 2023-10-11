const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const actviityRoutes = require('./routes/activityRoutes')

db.connectToDB()

app.use('/activities', actviityRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
