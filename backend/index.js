require('dotenv').config()            // for using env files configuration

const mongoose = require('mongoose')  // for easy interaction with the database
const express = require('express')    // for interaction with the node server
const app = express()                 // create an instance of express server
const uploadRouter = require('./routes/uploadRoute.js')
// const path = require('path')
// const cors = require('cors')

// import connectDB function and port number
const connectDB = require('./initDB')
const PORT = process.env.PORT || 4000

app.use(express.json())

// connect to MongoDB
connectDB()

app.use(uploadRouter)


// listen to requests only once after the connection to the database has been established.
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {console.log("Server started on PORT : ", PORT)})
})