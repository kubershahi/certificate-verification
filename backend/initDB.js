const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI)
    .then((x) => {
      console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err.reason)
    })
}

module.exports = connectDB