const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};

const userSchema = new Schema({
  email: requiredString,
  password: {
    type: String,
    required: true,
    select: false
  },
  username: requiredString,
  resetToken: String,
  resetTokenExpiration: Date,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'books'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);