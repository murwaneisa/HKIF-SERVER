const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to DB successfully')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectToDB,
}
