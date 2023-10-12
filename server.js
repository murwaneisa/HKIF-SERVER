const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const activityRoutes = require('./routes/activityRoutes')
const boardMemberRoutes = require('./routes/baordMemberRoutes')

app.use(express.json())

app.use('/activities', activityRoutes)
app.use('/boardMembers', boardMemberRoutes)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
