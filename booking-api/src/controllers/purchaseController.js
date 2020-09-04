const format = require('pg-format');

const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');

// @desc      make a purchase order
// @route     POST /api/v1/order
// @access    Private
exports.purchase = asyncHandler(async (req, res, next) => {
  // make sure the cart item quantity is greater than 0
  const cartItemQuery = `SELECT 
                            cart_item.product_id,
                            cart_item.user_id,
                            cart_item.quantity,
                            (cart_item.quantity * product.price) AS total
                         FROM cart_item 
                         JOIN product 
                         ON product.id = cart_item.product_id 
                         WHERE user_id = $1 AND quantity > $2`;
  const cartItemValues = [req.user.id, 0];

  const cartItemResponse = await db.query(cartItemQuery, cartItemValues);

  if (!cartItemResponse.rows || cartItemResponse.rows.length === 0) {
    return next(new ErrorResponse('No cart items found', 404));
  }

  let purchaseValues = [];

  cartItemResponse.rows.map((v) => {
    purchaseValues.push(Object.values(v));
  });

  // make a purchase with sql transaction
  try {
    await db.query('BEGIN');
    // 1. insert into table purchase with cartItemResponse
    const purchaseQuery = format(
      'INSERT INTO purchase (product_id, user_id, quantity, total) VALUES %L returning *',
      purchaseValues
    );

    await db.query(purchaseQuery);

    // 2. Delete all cart items afer purchased
    const deleteQuery = `DELETE FROM cart_item WHERE user_id = $1`;
    const value = [req.user.id];
    await db.query(deleteQuery, value);

    // 3. use stripe to charge customer
    // TODO: add charge functionality with stripe here
    await db.query('COMMIT');
    res.status(201).json({
      success: true
    });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(400).json({
      success: false,
      errMsg: 'Unable to make a purchase' + error
    });
  }
});
