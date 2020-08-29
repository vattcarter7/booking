const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');

// @desc      get all categories
// @route     GET /api/v1/category/all
// @access    Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const textQuery = `SELECT * FROM category`;
  const { rows } = await db.query(textQuery);
  if (!rows) return next(new ErrorResponse('No categories found', 404));
  res.status(200).json({
    success: true,
    results: rows,
    size: rows.length
  });
});

// @desc      add a category
// @route     POST /api/v1/category
// @access    Private/Admin
exports.addCategory = asyncHandler(async (req, res, next) => {
  const insertQuery = `INSERT INTO category (name) VALUES ($1) returning *`;
  const param = [req.body.name];

  const { rows } = await db.query(insertQuery, param);
  if (!rows[0])
    return next(new ErrorResponse('Unable to create category', 400));
  res.status(201).json({
    success: true,
    results: rows[0]
  });
});
