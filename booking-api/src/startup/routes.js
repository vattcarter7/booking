const express = require('express');

const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/v1/auth', auth);

  // for all errors
  app.use(error);
};
