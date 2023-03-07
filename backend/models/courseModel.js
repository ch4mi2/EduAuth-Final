const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('course', courseSchema);
