const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const start = require("./start");
const inquirer = require("inquirer");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const viewDept = () => {
  db.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.log(cTable.getTable(res));
    start()
  });
};

module.exports = viewDept;
