const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./configs/db')
const userRouter = require('./routes/userRoutes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRouter)

db.connectToDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
