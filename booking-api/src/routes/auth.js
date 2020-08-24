const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.router();
const { body } = require('express-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../db');

const validateRequest = require('../middleware/validateRequest');

router.post(
  '/register',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('firstname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Firstname must be between 2 and 50 charactors long'),
    body('lastname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Lstname must be between 2 and 50 charactors long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 charactors long'),
    validateRequest
  ],
  async (req, res) => {}
);
