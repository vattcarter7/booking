const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const validateRequest = require('../middleware/validateRequest');
const {
  addOrEditCartItem,
  removeCartItem
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.post(
  '/',
  protect,
  [
    check('product_id').not().isEmpty().withMessage('product_id is required'),
    validateRequest
  ],
  addOrEditCartItem
);

router.delete('/:id', protect, removeCartItem);

module.exports = router;
