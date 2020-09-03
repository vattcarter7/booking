const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');
const { convertJavascriptToPosgresTimestamp } = require('../helpers/timeUitl');

// @desc      add a cart item
// @route     POST /api/v1/cart
// @access    Private
exports.addCart = asyncHandler(async (req, res, next) => {
  const insertQuery = `INSERT INTO cart_item 
                      (product_id, user_id, quantity, modified_date) 
                      VALUES ($1, $2) 
                      ON CONFLICT ON CONSTRAINT cart_item_unique
                      DO 
                      UPDATE SET quantity = $3, modified_date = to_timestamp($4)
                      returning *`;
  const values = [
    req.body.product_id,
    req.body.user_id,
    req.body.quantity,
    convertJavascriptToPosgresTimestamp
  ];

  const { rows } = await db.query(insertQuery, values);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to add cart item', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});
