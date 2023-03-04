const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cProgrammingQuizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: String,
      },
    ],
    answers: [
      [
        {
          type: String,
        },
      ],
    ],
    correctAnswers: [
      [
        {
          type: String,
        },
      ],
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('cProgrammingQuiz', cProgrammingQuizSchema);
