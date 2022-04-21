const mongoose = require('mongoose')

// async function to connect to Mongodb
const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI)
    .then((x) => {
      console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err.reason)
    })
}

// export the connectDB function
module.exports = connectDB