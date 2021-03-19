const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};

const logEntrySchema = new Schema({
  title: requiredString,
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('logentries', logEntrySchema);