const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { getCategories } = require('../controllers/categoryController');

router.get('/all', getCategories);

module.exports = router;
