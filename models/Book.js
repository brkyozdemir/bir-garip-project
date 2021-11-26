const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  summary: String,
  author: String,
  pages: {
    type: Number,
    min: 0
  },
}, { timestamps: true })

bookSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;

  return obj;
}

module.exports = mongoose.model('books', bookSchema);