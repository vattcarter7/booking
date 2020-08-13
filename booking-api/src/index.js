const express = require('express');
const chalk = require('chalk');
require('express-async-errors');

const app = express();

//require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(
    chalk.yellow('up and running on port ' + chalk.underline.redBright(port))
  )
);

module.exports = server;
