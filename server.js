const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const db = require('./configs/db')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.json())

app.use('/users', userRouter)
app.use('/admins', adminRouter)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
