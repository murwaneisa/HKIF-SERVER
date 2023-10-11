const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const activityRoutes = require('./routes/activityRoutes')
const boardMemberRoutes = require('./routes/baordMemberRoutes')

db.connectToDB()

app.use('/activities', activityRoutes)
app.use('/boardMembers', boardMemberRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
