const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const userRouter = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')
const eventRoutes = require('./routes/eventRoutes')
const boardMemberRoutes = require('./routes/baordMemberRoutes')
const activityLeaderRoutes = require('./routes/activityLeaderRoutes')

app.use(express.json())

app.use('/user', userRouter)
app.use('/activities', activityRoutes)
app.use('/events', eventRoutes)
app.use('/boardMembers', boardMemberRoutes)
app.use('/activityLeader', activityLeaderRoutes)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
