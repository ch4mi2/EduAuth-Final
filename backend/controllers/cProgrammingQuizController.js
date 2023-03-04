const CProgrammingQuiz = require('../models/cProgrammingQuizModel');
const mongoose = require('mongoose');

// get all cProgrammingQuizs
const getCProgrammingQuizs = async (req, res) => {
  const cProgrammingQuizs = await CProgrammingQuiz.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(cProgrammingQuizs);
};

// get a single cProgrammingQuiz
const getCProgrammingQuiz = async (req, res) => {
  const { id } = req.params; // get id from url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such cProgrammingQuiz' });
  }

  const cProgrammingQuiz = await CProgrammingQuiz.findById(id);

  if (!cProgrammingQuiz) {
    return res.status(404).json({ error: 'No such cProgrammingQuiz' });
  }

  res.status(200).json(cProgrammingQuiz);
};

// create new cProgrammingQuiz
const createCProgrammingQuiz = async (req, res) => {
  const { name, questions, answers, correctAnswers } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!questions) {
    emptyFields.push('questions');
  }
  if (!answers) {
    emptyFields.push('answers');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the field', emptyFields });
  }
  // add doc to db
  try {
    const cProgrammingQuiz = await CProgrammingQuiz.create({
      name,
      questions,
      answers,
      correctAnswers,
    });
    res.status(200).json(cProgrammingQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a cProgrammingQuiz
const deleteCProgrammingQuiz = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such cProgrammingQuiz' });
  }

  const cProgrammingQuiz = await CProgrammingQuiz.findByIdAndDelete({
    _id: id,
  }); //delete

  if (!cProgrammingQuiz) {
    return res.status(400).json({ error: 'No such cProgrammingQuiz' });
  }

  res.status(200).json(cProgrammingQuiz);
};

// update a cProgrammingQuiz
const updateCProgrammingQuiz = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such cProgrammingQuiz' });
  }

  const cProgrammingQuiz = await CProgrammingQuiz.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body, // update with request body
    }
  );

  if (!cProgrammingQuiz) {
    return res.status(400).json({ error: 'No such cProgrammingQuiz' });
  }

  res.status(200).json(cProgrammingQuiz);
};

module.exports = {
  getCProgrammingQuizs,
  getCProgrammingQuiz,
  createCProgrammingQuiz,
  deleteCProgrammingQuiz,
  updateCProgrammingQuiz,
};
