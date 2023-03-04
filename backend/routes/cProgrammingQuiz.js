const express = require('express');
const {
  createCProgrammingQuiz,
  getCProgrammingQuiz,
  getCProgrammingQuizs,
  deleteCProgrammingQuiz,
  updateCProgrammingQuiz,
} = require('../controllers/cProgrammingQuizController');

const router = express.Router();

// GET all cProgrammingQuizs
router.get('/', getCProgrammingQuizs);

// GET a single cProgrammingQuiz
router.get('/:id', getCProgrammingQuiz);

// POST a new cProgrammingQuiz
router.post('/', createCProgrammingQuiz);

// DELETE a cProgrammingQuiz
router.delete('/:id', deleteCProgrammingQuiz);

// UPDATE a cProgrammingQuiz
router.patch('/:id', updateCProgrammingQuiz);

module.exports = router;
