const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');
const { covertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');

// @desc      get all products
// @route     GET /api/v1/product/all
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const textQuery = `SELECT * FROM product`;
  const { rows } = await db.query(textQuery);

  if (!rows) return next(new ErrorResponse('No products found', 404));

  res.status(200).json({
    success: true,
    results: rows,
    size: rows.length
  });
});

// @desc      get single product
// @route     GET /api/v1/product/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const textQuery = `SELECT * FROM product where id=$1`;
  const param = [req.params.id];
  const { rows } = await db.query(textQuery, param);

  if (!rows[0]) return next(new ErrorResponse('No such product found', 400));

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});
