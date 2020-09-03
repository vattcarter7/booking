const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const validateRequest = require('../middleware/validateRequest');
const { addOrEditCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.post(
  '/',
  [
    check('product_id').not().isEmpty().withMessage('product_id is required'),
    check('user_id').not().isEmpty().withMessage('user_id is required'),
    validateRequest
  ],
  addOrEditCartItem
);

module.exports = router;
