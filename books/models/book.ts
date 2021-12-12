import { Schema, model } from 'mongoose';

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
  delete obj.__v;

  return obj;
}

module.exports = model('books', bookSchema);