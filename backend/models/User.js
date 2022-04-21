const mongoose = require('mongoose')
const schema = mongoose.Schema

// for login: username, password, and refreshToken should be added
const userSchema = new Schema({
  name: { type: String, required: true},
  role: { type: String, enum: ['admin', 'institution', 'user', 'verifier']},
  certificates: {
    batch: String,
    level: String,
    certificate: Array,
    merkleRoot: String,
    deployed: Boolean,
    deployedDate: Date,
  }

})

const test = mongoose.model('User', userSchema)
console.log( (new test).certificates)

// export the user model from the module
module.exports = mongoose.model('User', userSchema)
