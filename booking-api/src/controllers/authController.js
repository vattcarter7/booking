const { promisify } = require('util');

const db = require('../db');
const asyncHandler = require('../middleware/async');
const {
  hashPassword,
  generateSignedJwtToken,
  comparePassword
} = require('../helpers/authHelper');
const { convertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');
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

  res.status(statusCode).cookie('jwt', token, cookieOptions).json({
    success: true,
    token,
    user
  });
};

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const hashedPassword = await hashPassword(req.body.password);

  const textQuery = `SELECT * FROM users WHERE email = $1`;
  const value = [req.body.email.toLowerCase().trim()];

  const response = await db.query(textQuery, value);

  // if the user with the provided email already existed
  if (response.rows[0]) {
    return next(
      new ErrorResponse(`Email already exists. Try using another email`, 403)
    );
  }

  const createQuery = `INSERT INTO
      users(firstname,lastname, email, password, created_at, tokens)
      VALUES($1, $2, $3, $4, to_timestamp($5), to_tsvector($6)) returning *`;
  const params = [
    req.body.firstname.trim().toLowerCase(),
    req.body.lastname.trim().toLowerCase(),
    req.body.email.trim().toLowerCase(),
    hashedPassword,
    convertJavascriptToPosgresTimestamp(Date.now()),
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
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const text = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await db.query(text, [req.body.email.trim().toLowerCase()]);
  if (!rows[0]) {
    return next(
      new ErrorResponse('The credentials you provided is incorrect', 400)
    );
  }
  if (!(await comparePassword(req.body.password, rows[0].password))) {
    return next(
      new ErrorResponse('The credentials you provided is incorrect', 400)
    );
  }

  const user = rows[0];

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 5 * 1000), // expires in 5 seconds
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    user: {}
  });
});

// @desc      GET my profile
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const text = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await db.query(text, [req.user.id]);
  if (!rows[0]) return next(new ErrorResponse('No user found', 401));
  const user = rows[0];
  user.password = undefined;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;
  res.status(200).json({
    success: true,
    user
  });
});
