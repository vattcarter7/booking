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
