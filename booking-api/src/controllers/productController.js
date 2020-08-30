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

// @desc      add a product
// @route     POST /api/v1/product
// @access    Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  const insertQuery = `INSERT INTO product 
    (
      category_id, 
      name,
      description, 
      price, 
      images, 
      shipping, 
      number_in_stock, 
      available, 
      sold, 
      tokens
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, to_tsvector($10)) returning *`;
  const param = [
    req.body.category_id,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.images,
    req.body.shipping,
    req.body.number_in_stock,
    req.body.available,
    req.body.sold,
    req.body.name.trim().toLowerCase() +
      ' ' +
      req.body.description.trim().toLowerCase()
  ];

  const { rows } = await db.query(insertQuery, param);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to add product', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});
