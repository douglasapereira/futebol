const mysql = require("mysql");
const utils = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3308,
  database: "futebol",
});

const db = {
  query(sql, args) {
    return utils.promisify(connection.query).call(connection, sql, args);
  },
  close() {
    return utils.promisify(connection.end).call(connection);
  },
};

module.exports = db;
