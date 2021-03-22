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

module.exports = mongoose.model('books', bookSchema);