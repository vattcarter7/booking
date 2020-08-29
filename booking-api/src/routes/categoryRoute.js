const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
  getCategories,
  addCategory
} = require('../controllers/categoryController');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/add',
  [
    check('name')
      .isLength({ min: 2 })
      .withMessage('a valid category name is required'),
    validateRequest
  ],
  addCategory
);

router.get('/all', getCategories);

module.exports = router;
