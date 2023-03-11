const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const userID = user._id;
    const faceImageUrl = user.faceImageUrl;

    res.status(200).json({email, token,userID, faceImageUrl})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, nicImageUrl,faceImageUrl } = req.body

  try {
    const user = await User.signup(email, password, nicImageUrl, faceImageUrl)

    // create a token
    const userID = user._id;
    const token = createToken(userID)


    res.status(201).json({email, token, faceImageUrl, userID})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Add certificates to a user
const addCertificates = async (req, res) => {
  const { userId } = req.params;
  const { exam } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { certificates: exam }
    }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add certificates' });
  }
};

//get certificates
const getCertificates = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  const certificates = user.certificates || []; // Make sure certificates is an array

  res.status(200).json(certificates);
};

module.exports = {
  loginUser,
  signupUser,
  addCertificates,
  getCertificates
}
