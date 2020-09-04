const express = require('express');
const { check } = require('express-validator');
const { order } = require('../controllers/orderController');

const router = express.Router();

const validateRequest = require('../middleware/validateRequest');

const { protect } = require('../middleware/auth');

router.post('/', order);

module.exports = router;
