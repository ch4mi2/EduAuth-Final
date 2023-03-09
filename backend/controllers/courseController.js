const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// get all courses
const getCourses = async (req, res) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });

  res.status(200).json(courses);
};

// get a single course
const getCourse = async (req, res) => {
  const { id } = req.params; // get id from url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such course' });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

// create new course
const createCourse = async (req, res) => {
  const { name, originalUrl, category, description, imageUrl } = req.body;

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
    const course = await Course.create({
      name,
      originalUrl,
      category,
      description,
      imageUrl,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such course' });
  }

  const course = await Course.findByIdAndDelete({ _id: id }); //delete

  if (!course) {
    return res.status(400).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such course' });
  }

  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body, // update with request body
    }
  );

  if (!course) {
    return res.status(400).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
