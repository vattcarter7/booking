const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = () => {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose
    .connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() =>
      console.log(chalk.blueBright(`connected to database url ${MONGO_URI}`))
    );
};
