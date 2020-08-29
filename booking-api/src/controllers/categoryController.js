const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');
const { covertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');

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

// @desc      Update a category
// @route     PUT /api/v1/category/:id
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const textQuery = `SELECT * FROM category WHERE id = $1`;
  const value = [req.params.id];
  const response = await db.query(textQuery, value);
  if (!response.rows[0])
    return next(new ErrorResponse('No such category to update', 404));

  const updateQuery = `UPDATE category SET
                          name             =$1, 
                          modified_date    =to_timestamp($2)
                        WHERE id = $3 returning *
                      `;
  const updateValues = [
    req.body.name || response.rows[0].name,
    covertJavascriptToPosgresTimestamp(Date.now()),
    req.params.id
  ];

  const { rows } = await db.query(updateQuery, updateValues);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to update category', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});
