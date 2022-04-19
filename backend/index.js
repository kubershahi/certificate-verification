require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
// const path = require('path')
// const cors = require('cors')

// import connectDB function and port number
const connectDB = require('./initDB')
const PORT = process.env.PORT || 4000


// connect to MongoDB
connectDB()

app.use(morgan('tiny'));

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {console.log("Server started on PORT : ", PORT)})
})



