const mongoose = require('mongoose')
const Schema = mongoose.Schema

// for login: username, password, and refreshToken should be added
const userSchema = new Schema({
  name: { type: String, required: true},
  // role: { type: String, enum: ['Admin', 'Institution', 'User', 'Verifier']},
  batch: { type: Schema.Types.Mixed, default: null},
  certificate: { type:Array},
  merkleRoot: { type:String, default: null },
  deployed: { type: Boolean, default: false },
  deployedDate: { type: Date, default: 1/1/1990},
}, {strict: false})

// export the user model from the module
module.exports = mongoose.model('User', userSchema)
