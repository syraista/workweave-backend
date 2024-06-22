const mysql = require('mysql2/promise');

const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "1304",
    database: "workweavedb",
    connectTimeout: 60000
  },
  listPerPage: 10,
};

const pool = mysql.createPool(config.db);

module.exports = { config, pool };
