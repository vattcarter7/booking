const express = require('express');
const { check } = require('express-validator');
const {
  purchase,
  getMyPurchases
} = require('../controllers/purchaseController');

const router = express.Router();

const validateRequest = require('../middleware/validateRequest');

const { protect } = require('../middleware/auth');

router.post('/', protect, purchase);
router.get('/', protect, getMyPurchases);

module.exports = router;
