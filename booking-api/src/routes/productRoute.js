const express = require('express');
const { check } = require('express-validator');

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

const validateRequest = require('../middleware/validateRequest');

const { protect } = require('../middleware/auth');

router.post(
  '/',
  [
    check('category_id').not().isEmpty().withMessage('Category ID is required'),
    check('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Lstname must be between 2 and 50 characters long'),
    check('price').not().isEmpty().withMessage('price is required'),
    check('number_in_stock')
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage('Number in stock is required'),
    validateRequest
  ],
  addProduct
);

router.get('/all', getProducts);

router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
