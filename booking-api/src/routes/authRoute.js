const express = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe
  // updateDetails,
  // updatePassword,
  // forgotPassword,
  // resetPassword,
} = require('../controllers/authController');

const router = express.Router();

const validateRequest = require('../middleware/validateRequest');

const { protect, myAuth } = require('../middleware/auth');

router.post(
  '/register',
  [
    check('email').trim().isEmail().withMessage('Email must be valid'),
    check('firstname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Firstname must be between 2 and 50 characters long'),
    check('lastname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Lastname must be between 2 and 50 characters long'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters long'),
    validateRequest
  ],
  register
);

router.post(
  '/login',
  [
    check('email')
      .trim()
      .isEmail()
      .withMessage('Please provided a valid email'),
    check('password').not().isEmpty().withMessage('Password is required'),
    validateRequest
  ],
  login
);

router.get('/logout', protect, logout);

router.get('/me', protect, getMe);

// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
