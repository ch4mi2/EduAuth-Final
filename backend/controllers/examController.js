const Exam = require('../models/examModel');
const mongoose = require('mongoose');

// get all exams
const getExams = async (req, res) => {
  const exams = await Exam.find({}).sort({ createdAt: -1 });

  res.status(200).json(exams);
};

// get a single exam
const getExam = async (req, res) => {
  const { id } = req.params; // get id from url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such exam' });
  }

  const exam = await Exam.findById(id);

  if (!exam) {
    return res.status(404).json({ error: 'No such exam' });
  }

  res.status(200).json(exam);
};

// create new exam
const createExam = async (req, res) => {
  const { name, originalUrl, category } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in the name field', emptyFields });
  }
  // add doc to db
  try {
    const exam = await Exam.create({ name, originalUrl, category });
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a exam
const deleteExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such exam' });
  }

  const exam = await Exam.findByIdAndDelete({ _id: id }); //delete

  if (!exam) {
    return res.status(400).json({ error: 'No such exam' });
  }

  res.status(200).json(exam);
};

// update a exam
const updateExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such exam' });
  }

  const exam = await Exam.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body, // update with request body
    }
  );

  if (!exam) {
    return res.status(400).json({ error: 'No such exam' });
  }

  res.status(200).json(exam);
};

module.exports = {
  getExams,
  getExam,
  createExam,
  deleteExam,
  updateExam,
};
