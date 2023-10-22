const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRouter)
app.use('/admins', adminRouter)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
