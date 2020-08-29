const { Pool } = require('pg');
const chalk = require('chalk');

let dbConfig = {};

if (process.env.NODE_ENV === 'production') {
  dbConfig = {
    connectionString: process.env.DATABASE_URL
  };
} else {
  dbConfig = {
    user: 'postgres',
    password: '111',
    host: 'localhost',
    database: 'booking',
    port: 5432
  };
}

const pool = new Pool(dbConfig);

module.exports = {
  query(sql, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(sql, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
