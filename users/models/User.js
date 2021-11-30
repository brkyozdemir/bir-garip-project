const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};

const userSchema = new Schema({
  email: requiredString,
  password: {
    ...requiredString,
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

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  delete obj._id;
  return obj;
}

module.exports = mongoose.model('users', userSchema);