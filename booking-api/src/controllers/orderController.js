const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');
const { convertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');

// @desc      make a purchase order
// @route     POST /api/v1/order
// @access    Private
exports.order = asyncHandler(async (req, res, next) => {
  // const textQuery = `SELECT * FROM category`;
  // const { rows } = await db.query(textQuery);
  // if (!rows) return next(new ErrorResponse('No categories found', 404));
  res.status(200).json({
    success: true
    // results: rows,
    // size: rows.length
  });
});
