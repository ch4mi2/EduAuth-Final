const express = require('express')

// controller functions
const { loginUser, signupUser, addCertificates, getCertificates } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//update certificate
router.post('/:userId/certificates', addCertificates);

router.get('/:userId/certificates', getCertificates);

module.exports = router