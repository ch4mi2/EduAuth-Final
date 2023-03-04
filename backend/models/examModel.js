const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('exam', examSchema);
