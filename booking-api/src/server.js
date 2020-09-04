const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('./helpers/error');

const app = express();

// Route files
const auth = require('./routes/authRoute');
const categories = require('./routes/categoryRoute');
const products = require('./routes/productRoute');
const carts = require('./routes/cartRoute');
const orders = require('./routes/orderRoute');
const users = require('./routes/userRoute');
const reviews = require('./routes/reviewRoute');

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  return res
    .status(200)
    .send({ message: ' congrats - BOOKING API first endpoint is working ' });
});

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/category', categories);
app.use('/api/v1/product', products);
app.use('/api/v1/cart', carts);
app.use('/api/v1/order', orders);
// app.use('/api/v1/users', users);
// app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App listening on port ${PORT}`.cyan.bold);
});
