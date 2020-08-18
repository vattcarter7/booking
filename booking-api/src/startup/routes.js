const express = require('express');

const users = requier('../routes/users');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', users);

  // for all errors
  app.use(error);
};
