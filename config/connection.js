const mysql = require('mysql2');

//require('.env').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'FijiWater2022!',
  database: 'company_db'
});

module.exports = connection;