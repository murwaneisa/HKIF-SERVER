const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const db = require('./configs/db')
const userRouter = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')
const eventRoutes = require('./routes/eventRoutes')
const boardMemberRoutes = require('./routes/boardMemberRoutes')
const activityLeaderRoutes = require('./routes/activityLeaderRoutes')
const blacklistedTokenRoutes = require('./routes/blacklistedTokenRoutes')
const adminRouter = require('./routes/adminRoutes')

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.json())

app.use('/users', userRouter)
app.use('/activities', activityRoutes)
app.use('/events', eventRoutes)
app.use('/boardMembers', boardMemberRoutes)
app.use('/activityLeaders', activityLeaderRoutes)
app.use('/blacklistedTokens', blacklistedTokenRoutes)
app.use('/admins', adminRouter)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
