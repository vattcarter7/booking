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
      image, 
      shipping, 
      number_in_stock, 
      available, 
      tokens
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, to_tsvector($9)) returning *`;
  const param = [
    req.body.category_id,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.image,
    req.body.shipping,
    req.body.number_in_stock,
    req.body.available,
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

// @desc      update a product
// @route     PUT /api/v1/product/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const textQuery = `SELECT * FROM product WHERE id = $1`;
  const value = [req.params.id];
  const response = await db.query(textQuery, value);
  if (!response.rows[0])
    return next(new ErrorResponse('No such product to update', 404));

  const updateQuery = `UPDATE product SET
                          category_id      =$1,
                          name             =$2, 
                          description      =$3,
                          price            =$4,
                          image            =$5,
                          shipping         =$6,
                          number_in_stock  =$7,
                          available        =$8,
                          published        =$9,
                          tokens           =to_tsvector($10),
                          modified_date    =to_timestamp($11)
                        WHERE id = $12 returning *
                      `;
  const updateValues = [
    req.body.category_id || response.rows[0].category_id,
    req.body.name || response.rows[0].name,
    req.body.description || response.rows[0].description,
    req.body.price || response.rows[0].price,
    req.body.image || response.rows[0].image,
    req.body.shipping || response.rows[0].shipping,
    req.body.number_in_stock || response.rows[0].number_in_stock,
    req.body.available || response.rows[0].available,
    req.body.published || response.rows[0].published,
    req.body.name + ' ' + req.body.description ||
      response.rows[0].name + ' ' + req.body.description,
    covertJavascriptToPosgresTimestamp(Date.now()),
    req.params.id
  ];

  const { rows } = await db.query(updateQuery, updateValues);
  if (!rows[0]) {
    return next(new ErrorResponse('Unable to update product', 400));
  }

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});

// @desc      Delete a product
// @route     DELETE /api/v1/product/:id
// @access    Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const deleteQuery = 'DELETE FROM product WHERE id=$1 returning *';
  const { rows } = await db.query(deleteQuery, [req.params.id]);

  if (!rows[0])
    return next(new ErrorResponse(`Unable to delete category`, 400));

  res.status(200).json({
    success: true,
    results: rows[0]
  });
});
