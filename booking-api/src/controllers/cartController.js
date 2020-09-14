const db = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');

// @desc      get all cart items by a user
// @route     GET /api/v1/cart
// @access    Private
exports.getCartItems = asyncHandler(async (req, res, next) => {
  // make sure the cart item quantity is greater than 0
  const textQuery = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, 
                            product.image, product.name, product.price 
                      FROM cart_item JOIN product ON product.id = cart_item.product_id 
                      WHERE cart_item.user_id = $1 AND cart_item.quantity > $2`;
  const values = [req.user.id, 0];

  const { rows } = await db.query(textQuery, values);
  if (!rows) {
    return next(new ErrorResponse('No cart items found', 404));
  }

  res.status(200).json({
    success: true,
    results: rows,
    size: rows.length
  });
});

// @desc      add a cart item or edit a cart
// @route     POST /api/v1/cart
// @access    Private
exports.addOrEditCartItem = asyncHandler(async (req, res, next) => {
  const insertQuery = `INSERT INTO cart_item 
                        (product_id, user_id, quantity) 
                        VALUES ($1, $2, $3) 
                        ON CONFLICT ON CONSTRAINT cart_item_unique
                        DO 
                        UPDATE SET quantity = $3
                        returning *`;

  const values = [req.body.product_id, req.user.id, req.body.quantity];

  const { rows } = await db.query(insertQuery, values);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to add cart item', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});

// @desc      remove a cart item
// @route     DELETE /api/v1/cart/:id
// @access    Private
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const deleteQuery = `DELETE FROM cart_item WHERE id = $1 AND user_id = $2 returning *`;
  const values = [req.params.id, req.user.id];

  const { rows } = await db.query(deleteQuery, values);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to remove such cart item', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});

// @desc      remove all cart items for a user
// @route     DELETE /api/v1/cart
// @access    Private
exports.removeAllCartItems = asyncHandler(async (req, res, next) => {
  const deleteQuery = `DELETE FROM cart_item WHERE user_id = $1 returning *`;
  const values = [req.user.id];

  const { rows } = await db.query(deleteQuery, values);
  if (!rows) {
    return next(new ErrorResponse('Unable remove all cart items', 400));
  }

  res.status(200).json({
    success: true,
    results: rows
  });
});
