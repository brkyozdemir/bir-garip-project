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
}, { timestamps: true });

logEntrySchema.methods.toJSON = function () {
  let obj = this.toObject();

  delete obj._id;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
}

module.exports = mongoose.model('logentries', logEntrySchema);