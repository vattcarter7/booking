const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const validateRequest = require('../middleware/validateRequest');

router.get('/', getCategories);

router.post(
  '/',
  [
    check('name')
      .isLength({ min: 2 })
      .withMessage('a valid category name is required'),
    validateRequest
  ],
  addCategory
);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
