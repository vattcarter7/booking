const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const db = require('../db');
const validateRequest = require('../middleware/validateRequest');
const {
  hashPassword,
  generateSignedJwtToken
} = require('../helpers/authHelper');
const { covertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');
const ErrorResponse = require('../helpers/errorResponse');

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateSignedJwtToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.password = undefined;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;

  res.status(statusCode).cookie('auth_jwt', token, cookieOptions).json({
    success: true,
    user
  });
};

router.post(
  '/register',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('firstname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Firstname must be between 2 and 50 characters long'),
    body('lastname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Lstname must be between 2 and 50 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters long'),
    validateRequest
  ],
  async (req, res, next) => {
    const hashedPassword = await hashPassword(req.body.password);

    const textQuery = `SELECT * FROM users WHERE email = $1`;
    const value = [req.body.email.toLowerCase().trim()];

    const response = await db.query(textQuery, value);

    if (response.rows[0]) {
      return next(new ErrorResponse(`Unable to register.`, 403));
    }

    const createQuery = `INSERT INTO
        users(firstname,lastname, email, password, created_at, tokens)
        VALUES($1, $2, $3, $4, to_timestamp($5), to_tsvector($6)) returning *`;
    const params = [
      req.body.firstname.trim().toLowerCase(),
      req.body.lastname.trim().toLowerCase(),
      req.body.email.trim().toLowerCase(),
      hashedPassword,
      covertJavascriptToPosgresTimestamp(Date.now()),
      req.body.firstname.trim().toLowerCase() +
        ' ' +
        req.body.lastname.trim().toLowerCase()
    ];

    const { rows } = await db.query(createQuery, params);
    if (!rows[0]) {
      return next(new ErrorResponse('Cannot register with this email', 400));
    }

    const user = rows[0];

    sendTokenResponse(user, 201, res);
  }
);

module.exports = router;
