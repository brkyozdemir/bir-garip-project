const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};

const userSchema = new Schema({
  email: requiredString,
  password: requiredString,
  resetToken: String,
  resetTokenExpiration: Date
});

module.exports = mongoose.model('users', userSchema);