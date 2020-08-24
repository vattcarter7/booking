const express = require('express');
const chalk = require('chalk');
require('express-async-errors');

const app = express();

// TODO: add product route
// TODO: add user route
// TODO: add stripe payment

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(
    chalk.yellow('up and running on port ' + chalk.underline.redBright(port))
  )
);

module.exports = server;
