const express = require('express');
const { check } = require('express-validator');

const { getProducts } = require('../controllers/productController');

const router = express.Router();

const validateRequest = require('../middleware/validateRequest');

const { protect } = require('../middleware/auth');

router.get('/all', getProducts);

module.exports = router;
